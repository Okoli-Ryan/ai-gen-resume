"use server"

import { auth, signOut } from "@/auth";
import { db } from "@/db";
import { resumes } from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";

export async function createResume() {
    try {
        const session = await auth();
        const userId = session?.user?.id;

        if (!userId) await signOut({ redirectTo: "/sign-in" });

        const [resume] = await db
            .insert(resumes)
            .values({ name: "New Resume", userId, location: "" } as InferInsertModel<
                typeof resumes
            >)
            .returning();
        return { data: resume };
    } catch (error: any) {
        return { error: error?.message || "Failed to create resume" };
    }
}
