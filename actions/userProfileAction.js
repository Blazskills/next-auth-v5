"use server";

import { signOut } from "@/auth";

export async function userProfileAction(token) {
  try {
    if (token ?? false) {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/account/profile/`;
      const userRes = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return userRes;
    }
  } catch (error) {
    return null;
  }
}
