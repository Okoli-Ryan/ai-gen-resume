import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { bulletPoints } from "./bullet-point-schema";
import { defaultColumns } from "./common";
import { resumes } from "./resume-schema";

export const education = pgTable("education", {
	resumeId: uuid().references(() => resumes.id),
	schoolName: varchar({ length: 128 }).notNull(),
	degree: varchar({ length: 64 }).notNull(),
	major: varchar({ length: 64 }).notNull(),
	location: varchar({ length: 64 }).notNull(),
	...defaultColumns,
});

export const educationRelations = relations(education, ({ one }) => ({
	resume: one(resumes, {
		fields: [education.resumeId],
		references: [resumes.id],
		relationName: "resume_education",
	}),
}));

export const educationBulletPoints = pgTable("educationBulletPoints", {
	educationId: uuid()
		.notNull()
		.references(() => education.id),
	bulletPointId: uuid()
		.notNull()
		.references(() => bulletPoints.id),
});
