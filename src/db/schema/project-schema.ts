import { relations } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";

import { bulletPoints } from "./bullet-point-schema";
import { defaultColumns } from "./common";
import { resumes } from "./resume-schema";

export const projects = pgTable("project", {
	resumeId: text().references(() => resumes.id),
	name: varchar({ length: 128 }).notNull(),
	link: varchar({ length: 128 }),
	...defaultColumns,
});

export const projectRelations = relations(projects, ({ one, many }) => ({
	resume: one(resumes, {
		fields: [projects.resumeId],
		references: [resumes.id],
		relationName: "resume_projects",
	}),
	bulletPoints: many(bulletPoints, {
		relationName: "project_bulletPoints",
	}),
}));