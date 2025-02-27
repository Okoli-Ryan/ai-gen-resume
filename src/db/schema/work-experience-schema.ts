import { relations } from "drizzle-orm";
import { boolean, date, pgTable, text, varchar } from "drizzle-orm/pg-core";

import { bulletPoints } from "./bullet-point-schema";
import { defaultColumns } from "./common";
import { resumes } from "./resume-schema";

export const workExperience = pgTable("workExperience", {
    resumeId: text().references(() => resumes.id),
    companyName: varchar({ length: 128 }).notNull(),
    companyLink: varchar({ length: 128 }),
    title: varchar({ length: 64 }).notNull(),
    startDate: date().notNull(),
    endDate: date().notNull(),
    isOngoing: boolean().notNull().default(false),
    location: varchar({ length: 64 }).notNull(),
    ...defaultColumns,
});

export const workExperienceRelations = relations(
    workExperience,
    ({ one, many }) => ({
        resume: one(resumes, {
            fields: [workExperience.resumeId],
            references: [resumes.id],
            relationName: "resume_workExperience",
        }),
        bulletPoints: many(bulletPoints, {
            relationName: "workExperience_bulletPoints",
        }),
    })
);
