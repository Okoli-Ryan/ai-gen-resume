import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { findOrCreateUser } from "./db/services/user-service";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [Google],
	callbacks: {
		async jwt({ token, user, account }) {
			const fetchedUser = await findOrCreateUser({
				email: user.email!,
				name: user.name!,
				provider: account?.provider,
				providerId: account?.providerAccountId,
			});
			return {
				...token,
				user: { ...fetchedUser },
			};
		},
		async session({ session }) {
			return {
				...session,
				user: { ...session.user },
			};
		},
	},
});
