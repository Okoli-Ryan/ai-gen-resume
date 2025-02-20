"use server"

import { signIn, signOut } from "@/auth"

export async function signinWithGoogle() {
	await signIn("google", {redirectTo: "/profile"})
}

export async function signOutAction() {
	await signOut({redirectTo: "/sign-in"})
}