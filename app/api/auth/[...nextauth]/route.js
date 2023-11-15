import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import LineProvider from "next-auth/providers/line";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID,
      clientSecret: process.env.LINE_CLIENT_SECRET,
    }),
  ],
});

export { handler as GET, handler as POST };
