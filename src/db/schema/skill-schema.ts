import { relations, sql } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { defaultColumns } from "./common";
import { resumes } from "./resume-schema";
import { profiles } from "./profile-schema";

export const skills = pgTable("skill", {
	category: varchar({ length: 64 }),
	resumeId: uuid().references(() => resumes.id),
	profileId: uuid().references(() => profiles.id),
	items: varchar({ length: 128 })
		.array()
		.notNull()
		.default(sql`ARRAY[]::text[]`),
	...defaultColumns,
});

export const skillsRelations = relations(skills, ({ one }) => ({
	profile: one(profiles, {
		fields: [skills.profileId],
		references: [profiles.id],
		relationName: "profile_skills",
	}),
	resume: one(resumes, {
		fields: [skills.resumeId],
		references: [resumes.id],
		relationName: "resume_skills",
	}),
}));