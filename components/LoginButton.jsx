"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginButton() {
  const [credentials, setCredentials] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });
    console.log(result);
  };

  return (
    <div className="flex gap-4">
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </label>
        <br />
        <button type="submit">Sign In</button>
      </form>

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

      <button
        onClick={() => signIn("google")}
        className="mt-4 bg-slate-800 text-white px-6 py-3 rounded-lg"
      >
        Sign in with google
      </button>
    </div>
  );
}
