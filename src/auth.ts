import { db } from "./db/index";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { userService } from "./db/services/user-service";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    adapter: DrizzleAdapter(db),
    callbacks: {
        session({ session, user }) {
            session.user.id = user.id;
            return session;
        },
    },
});
