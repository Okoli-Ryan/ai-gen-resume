import { date, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { defaultColumns } from "./common";
import { resumes } from "./resume-schema";
import { profiles } from "./profile-schema";
import { relations } from "drizzle-orm";
import { bulletPoints } from "./bullet-point-schema";

export const workExperience = pgTable("workExperience", {
	resumeId: uuid().references(() => resumes.id),
	profileId: uuid().references(() => profiles.id),
	companyName: varchar({ length: 128 }).notNull(),
	companyLink: varchar({ length: 128 }),
	title: varchar({ length: 64 }).notNull(),
	startDate: date().notNull(),
	endDate: date(),
	location: varchar({ length: 64 }).notNull(),
	...defaultColumns,
});

export const workExperienceRelations = relations(workExperience, ({ one }) => ({
	profile: one(profiles, {
		fields: [workExperience.profileId],
		references: [profiles.id],
		relationName: "profile_workExperience",
	}),
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