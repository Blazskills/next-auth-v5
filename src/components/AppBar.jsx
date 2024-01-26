import Link from "next/link";
import React from "react";

export const AppBar = () => {
  return (
    <div className="flex gap-5 justify-center py-5 text-blue-500 text-lg font-semibold ">
      <Link href="/">
        <p>Home</p>
      </Link>
      <Link href="/student">
        <p>Student</p>
      </Link>
      <Link href="/staff">
        <p>Staff</p>
      </Link>
      <Link href="/settings">
        <p>Settings</p>
      </Link>
      <Link href="/auth/login">
        <p>Login</p>
      </Link>
      <Link href="/auth/register">
        <p>Register</p>
      </Link>
    </div>
  );
};
