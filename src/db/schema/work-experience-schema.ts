import { relations } from "drizzle-orm";
import { date, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { bulletPoints } from "./bullet-point-schema";
import { defaultColumns } from "./common";
import { resumes } from "./resume-schema";

export const workExperience = pgTable("workExperience", {
	resumeId: uuid().references(() => resumes.id),
	companyName: varchar({ length: 128 }).notNull(),
	companyLink: varchar({ length: 128 }),
	title: varchar({ length: 64 }).notNull(),
	startDate: date().notNull(),
	endDate: date(),
	location: varchar({ length: 64 }).notNull(),
	...defaultColumns,
});

export const workExperienceRelations = relations(workExperience, ({ one }) => ({
	resume: one(resumes, {
		fields: [workExperience.resumeId],
		references: [resumes.id],
		relationName: "resume_workExperience",
	}),
}));

export const workExperienceBulletPoints = pgTable("workExperienceBulletPoints", {
	workExperienceId: uuid()
		.notNull()
		.references(() => workExperience.id),
	bulletPointId: uuid()
		.notNull()
		.references(() => bulletPoints.id),
});
