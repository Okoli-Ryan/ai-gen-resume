import { auth } from "@/auth";
import { db } from "@/db";
import { resumes } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export type ResumeByIdResponse = Awaited<
    ReturnType<typeof getResumeById>
>["data"];

export async function getResumeById(id: string) {
    const session = await auth();
    const userId = session!.user.id;

    try {
        const resume = await db.query.resumes.findFirst({
            where: and(eq(resumes.id, id), eq(resumes.userId, userId)),
            with: {
                education: true,
                projects: true,
                skills: true,
                workExperience: true,
            },
        });

        if (!resume) throw new Error("Resume not found");

        return { data: resume };
    } catch (error: any) {
        return { error: error?.message || "Failed to fetch resume" };
    }
}
