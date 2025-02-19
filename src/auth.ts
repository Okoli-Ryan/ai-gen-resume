
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { findOrCreateUser } from "./db/services/user-service";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [Google],
	callbacks: {
		async signIn({ user, account }) {
			await findOrCreateUser({
				email: user.email!,
				name: user.name!,
				provider: account?.provider,
				providerId: account?.providerAccountId,
			});

			return true;
		},
	},
});