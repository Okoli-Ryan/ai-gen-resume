import NextAuth, { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';

import { DrizzleAdapter } from '@auth/drizzle-adapter';

import { db } from './db/index';
import { accounts, authenticators, sessions, users, verificationTokens } from './db/schema';

export const authConfig = {
    providers: [Google],
    adapter: DrizzleAdapter(db, {
        accountsTable: accounts,
        usersTable: users,
        authenticatorsTable: authenticators,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
    }),
    callbacks: {
        session({ session, user }) {
            session.user.id = user.id;
            return session;
        },
	  authorized({auth, request: {nextUrl}}) {
		const isLoggedIn = !!auth?.user

		const publicPaths = ["/sign-in"]
		const isProtected = !publicPaths.some((path) => nextUrl.pathname.startsWith(path)) || nextUrl.pathname === "/";

		if(isProtected && !isLoggedIn) {
			const redirectUrl = new URL("sign-in", nextUrl.origin)
			redirectUrl.searchParams.append("callbackUrl", nextUrl.href)
			return Response.redirect(redirectUrl.href)
		}

		return true
	  }
    },
    pages: {
        signIn: "sign-in",
    },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
