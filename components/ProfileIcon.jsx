"use client";

import { signIn, useSession, signOut } from "next-auth/react";

export default function ProfileIcon() {
  const { data: session, status } = useSession();

  console.log(session);

  if (status === "loading") {
    return null;
  }

  if (status === "authenticated") {
    return (
      <div className="flex gap-5">
        <img
          src={session.user.image}
          width={40}
          height={40}
          className="rounded-full"
        />
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => signIn("github")}>github Sign In</button>
    </div>
  );
}
