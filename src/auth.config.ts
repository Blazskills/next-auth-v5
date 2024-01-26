import type { NextAuthConfig } from "next-auth"


import Credentials from "next-auth/providers/credentials"


export default {
  providers: [
    Credentials({
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
          const errorResponse = await res.json();
          console.log(errorResponse)
          throw new Error(errorResponse?.message || "Login failed");
        } catch (error) {
          // console.error("Error during login:", error);
          throw new Error(`${error}`);
        }
      },
    })
  ],
} satisfies NextAuthConfig