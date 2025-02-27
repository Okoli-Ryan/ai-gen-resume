import { relations } from "drizzle-orm";
import { boolean, date, pgTable, text, varchar } from "drizzle-orm/pg-core";

import { bulletPoints } from "./bullet-point-schema";
import { defaultColumns } from "./common";
import { resumes } from "./resume-schema";

export const education = pgTable("education", {
    resumeId: text()
        .notNull()
        .references(() => resumes.id),
    schoolName: varchar({ length: 128 }).notNull(),
    degree: varchar({ length: 64 }).notNull(),
    major: varchar({ length: 64 }).notNull(),
    location: varchar({ length: 64 }).notNull(),
    startDate: date().notNull(),
    endDate: date().notNull(),
    isOngoing: boolean().notNull().default(false),
    ...defaultColumns,
});

export const educationRelations = relations(education, ({ one, many }) => ({
    resume: one(resumes, {
        fields: [education.resumeId],
        references: [resumes.id],
        relationName: "resume_education",
    }),
    bulletPoints: many(bulletPoints, {
        relationName: "education_bulletPoints",
    }),
}));
