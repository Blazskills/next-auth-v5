"use server";

import { signOut } from "@/auth";

export const refreshToken = async (token) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/account/jwt/refresh/`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: token?.refreshToken,
      }),
    });

    if (res?.ok) {
      const data = await res.json();
      return {
        ...token,
        error: null,
        accessToken: data?.access,
        refreshToken: data?.refresh,
        expiresIn: Date.now() + 30 * 24 * 60 * 60 * 1000,
      };
    } else {
      const logUserOut = await signOut();
      return await signOut();
    }
  } catch (error) {
    // console.error("Error refreshing token:", error);
    return await signOut();
  }
};
