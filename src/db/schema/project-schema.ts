import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { defaultColumns } from "./common";
import { relations } from "drizzle-orm";
import { profiles } from "./profile-schema";
import { resumes } from "./resume-schema";
import { bulletPoints } from "./bullet-point-schema";

export const projects = pgTable("project", {
	resumeId: uuid().references(() => resumes.id),
	profileId: uuid().references(() => profiles.id),
	name: varchar({ length: 128 }).notNull(),
	link: varchar({ length: 128 }),
	...defaultColumns,
});

export const projectRelations = relations(projects, ({ one }) => ({
	profile: one(profiles, {
		fields: [projects.profileId],
		references: [profiles.id],
		relationName: "profile_projects",
	}),
	resume: one(resumes, {
		fields: [projects.resumeId],
		references: [resumes.id],
		relationName: "resume_projects",
	}),
}));



export const projectBulletPoints = pgTable("projectBulletPoints", {
	projectId: uuid()
		.notNull()
		.references(() => projects.id),
	bulletPointId: uuid()
		.notNull()
		.references(() => bulletPoints.id),
});
