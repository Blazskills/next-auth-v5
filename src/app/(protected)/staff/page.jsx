import { useCurrentUser } from "@/hooks/use-current-user";
import { currentRole, currentUser } from "@/lib/auth";
import { authRoutes, publicRoutes } from "@/route";
import React from "react";

const Staff = async () => {
  const user = await currentUser();
  const perms = await currentRole();
  return (
    <div>
      Staff <br />
      {user?.full_name}
      {perms}
      {/* {JSON.stringify(user)} */}
    </div>
  );
};

export default Staff;
