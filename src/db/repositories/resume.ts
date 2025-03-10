import { eq, InferInsertModel } from "drizzle-orm";
import { db } from "..";
import { resumes, users } from "../schema";

export function createResume(user: InferInsertModel<typeof users>) {
    return db
        .insert(resumes)
        .values({
            name: "New Resume",
            userId: user?.id,
            email: user?.email,
            location: "",
        } as InferInsertModel<typeof resumes>)
        .returning();
}

export function updateResume(resume: Partial<InferInsertModel<typeof resumes>>, resumeId: string) {
    return db.update(resumes).set(resume).where(eq(resumes.id, resumeId)).returning();
}

