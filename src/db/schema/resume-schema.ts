import { relations } from "drizzle-orm";
import { boolean, pgTable, text, unique, varchar } from "drizzle-orm/pg-core";

import { defaultColumns } from "./common";
import { education } from "./education-schema";
import { projects } from "./project-schema";
import { skills } from "./skill-schema";
import { users } from "./user-schema";
import { workExperience } from "./work-experience-schema";

export const resumes = pgTable(
	"resume",
	{
		name: varchar({ length: 64 }).notNull(),
		summary: text(),
		userId: text()
			.notNull()
			.references(() => users.id),
		jobDescription: text(),
		isPublished: boolean().default(false),
		role: varchar({ length: 64 }),
		location: varchar({ length: 64 }).notNull(),
		phoneNumber: varchar({ length: 32 }),
		linkedinUrl: varchar({ length: 128 }),
		githubUrl: varchar({ length: 128 }),
		portfolioUrl: varchar({ length: 128 }),
		...defaultColumns,
	},
	(t) => [unique().on(t.id, t.userId)]
);

export const resumeRelations = relations(resumes, ({ many, one }) => ({
	user: one(users, {
		fields: [resumes.userId],
		references: [users.id],
		relationName: "user_resumes",
	}),
	education: many(education, { relationName: "resume_education" }),
	workExperience: many(workExperience, {
		relationName: "resume_workExperience",
	}),
	projects: many(projects, { relationName: "resume_projects" }),
	skills: many(skills, { relationName: "resume_skills" }),
}));
