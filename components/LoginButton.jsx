"use client";

import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => signIn("line")}
        className="mt-4 bg-slate-800 text-white px-6 py-3 rounded-lg"
      >
        line Sign In
      </button>
      <button
        onClick={() => signIn("github")}
        className="mt-4 bg-slate-800 text-white px-6 py-3 rounded-lg"
      >
        Sign in with Github
      </button>
    </div>
  );
}
