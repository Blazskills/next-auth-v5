import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { userProfileAction } from "../actions/userProfileAction";
export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", required: true },
        password: { label: "Password", type: "password", required: true },
      },

      async authorize(credentials) {
        const role = credentials?.role;
        const url =
          role === "staff"
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/account/login/staff/`
            : null;

        if (!url) {
          throw new Error("Invalid role");
        }

        try {
          const res = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              admission_number: credentials?.email,
              password: credentials?.password,
            }),
          });

          if (res.ok) {
            const response = await res.json();
            return response;
          }
          // If response is not okay, throw an error with the message from the server
          // console.error("App Error response:", error);
          const errorResponse = await res.json();
          throw new Error(errorResponse?.message || "Login failed");
        } catch (error) {
          // If response from the server is bad or server is down or misbehaving, the error is passed
          // console.error("Server Error:", error);
          throw new Error(`${error}`);
          // return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user?.token?.access;
        token.refreshToken = user?.token?.refresh;
        token.ut = user?.ut;
        token.expiresIn = user?.expiresIn;
      }
      return token;
    },
    session: async ({ session, token }) => {
      const res = await userProfileAction(token?.accessToken);
      if (session?.user) {
        if (res) {
          const userDetails = await res.json();
          const userType = userDetails?.data?.user?.user_type;
          session.user.accessToken = token?.accessToken;
          session.user.refreshToken = token?.refreshToken;
          session.user.full_name = `${userDetails?.data?.user?.first_name} ${userDetails?.data?.user?.last_name}`;
          session.user.current_user_type =
            userType === "Staff" || userType === "Admin" ? "Staff" : null;
          session.user.permission = userDetails?.data?.user?.permission;
          session.user.userData = userDetails?.data;
        } else {
          // if the server is down or user is blocked or without permission,
          // i log the user out of the system. They can login again
          return signOut();
        }
        return session;
      }
    },
  },
});
