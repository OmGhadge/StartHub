import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [  Google({
    clientId: process.env.AUTH_GOOGLE_ID!,
    clientSecret: process.env.AUTH_GOOGLE_SECRET!,
  }),GitHub({
    clientId:process.env.AUTH_GITHUB_ID!,
    clientSecret:process.env.AUTH_GITHUB_SECRET!,
  })],
  callbacks: {
    async signIn({
      user,
      account,
      profile
    }) {
       const provider = account?.provider;
        const id = profile?.id || profile?.sub || null;
          if (!id) {
        console.error("OAuth profile ID is missing");
        return false;
      }

  if (!id) {
      console.error("OAuth profile ID missing");
      return false;
    }
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id,
        });


      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name: user.name,
          username: profile?.login || user?.name?.split(" ")[0] || "user",
          email: user.email,
          image: user.image,
          bio: profile?.bio || "",
        });
      }

      return true;
    },
    async jwt({ token, account, profile }) {
       const id = profile?.id || profile?.sub;
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id,
          });

        token.id = user?._id;
      }

      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});