import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { saveUserToDB } from "@/utils/user-utils";

export type ProfileType = {
    id?: string,
    sub?: string,
}

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await saveUserToDB({
          name: user.name,
          password: null,
          email: user.email,
          image: user.image,
          provider: account?.provider,
          providerAccountId: account?.providerAccountId,
        });
      } catch (err) {
        console.error("❌ Error saving user:", err);
        return false;
      }
      return true;
    },

    async jwt({ token, account, profile }: { token: any, account?: any, profile?: ProfileType }) {
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
        token.id = profile?.sub || profile?.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).accessToken = token.accessToken as string;
        (session.user as any).provider = token.provider as string;
      }
      return session;
    },
  },
};
