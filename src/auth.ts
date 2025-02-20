import { db } from "./db/index";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { userService } from "./db/services/user-service";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { accounts, authenticators, sessions, users, verificationTokens } from "./db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    adapter: DrizzleAdapter(db, {
	accountsTable: accounts,
	usersTable: users,
	authenticatorsTable: authenticators,
	sessionsTable: sessions,
	verificationTokensTable: verificationTokens
    }),
    callbacks: {
        session({ session, user }) {
            session.user.id = user.id;
            return session;
        },
    },
});
