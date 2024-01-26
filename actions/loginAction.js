"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function loginAction(formData, callBkUrl) {
  try {
    const res = await signIn("credentials", {
      email: formData?.admission_number,
      password: formData?.password,
      role: "staff",
      redirect: false,
      callbackUrl: callBkUrl,
    });
    return res;
  } catch (error) {
    console.log(error?.cause?.err?.message?.split(": ")?.[1]);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: error?.cause?.err?.message?.split(": ")?.[1]};
      }
    }
    throw error;
  }
}
