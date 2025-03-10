"use server"

import { auth, signOut } from "@/auth";
import { db } from "@/db";
import { createResume } from "@/db/repositories/resume";
import { resumes } from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";

export async function createResumeAction() {
    try {
        const session = await auth();
        const user = session?.user;

        if (!user) return await signOut({ redirectTo: "/sign-in" });

        const [resume] = await createResume(user);
        return { data: resume };
    } catch (error: any) {
        return { error: error?.message || "Failed to create resume" };
    }
}
