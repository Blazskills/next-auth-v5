// import { auth, signOut } from "@/auth";
// import React from "react";
// // import { authOptions } from "@/auth";
// const SettingsPage = async () => {
//   const session = await auth();
//   return (
//     <>
//       <div>
//         SettingsPage <br />
//         {JSON.stringify(session)}
// <form
//   action={async () => {
//     "use server";
//     await signOut();
//   }}
// >
//   <button type="submit">Sign Out</button>
// </form>
//       </div>
//     </>
//   );
// };

// export default SettingsPage;
// server page
import { auth, signOut } from "@/auth";
import React from "react";

const Settings = async () => {
  const session = await auth();
  return (
    <div className="bg-red-300 overflow-x-auto mx-auto w-5/12">
      <div>Settings</div>
      <div className="bg-green-500 w-screen">{JSON.stringify(session?.user)}</div>

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
};

export default Settings;
