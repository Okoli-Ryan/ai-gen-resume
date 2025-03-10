"use server";

import { updateResume } from "@/db/repositories/resume";
import { actionClient } from "@/lib/safe-action";
import { z } from "zod";

const UpdatePersonalInfoSchema = z.object({
    name: z.string().min(1, "Name is required"),
    role: z.string().min(1, "Role is required"),
    location: z.string().optional(),
    linkedinUrl: z.string().url("Invalid LinkedIn URL").optional(),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    email: z.string().email("Invalid email address"),
    githubUrl: z.string().url("Invalid GitHub URL").optional(),
    portfolioUrl: z.string().url("Invalid portfolio URL").optional(),
    resumeId: z.string(),
});

export const updatePersonalInfo = actionClient
    .schema(UpdatePersonalInfoSchema)
    .action(async ({ parsedInput: { resumeId, ...payload } }) => {
        return await updateResume(payload, resumeId);
    });
