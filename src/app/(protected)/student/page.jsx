"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import React from "react";

const Student = () => {
  const user = useCurrentUser();
  return (
    <div>
      Student
      {JSON.stringify(user)}
    </div>
  );
};

export default Student;
