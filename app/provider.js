"use client";

import { SessionProvider } from "next-auth/react";
import { NextUIProvider as UIProvider } from "@nextui-org/react";

export const NextAuthProvider = ({ children }) => {
  return (
    <SessionProvider>
      <UIProvider>{children}</UIProvider>
    </SessionProvider>
  );
};
