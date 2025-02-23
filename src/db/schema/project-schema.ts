import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { bulletPoints } from "./bullet-point-schema";
import { defaultColumns } from "./common";
import { resumes } from "./resume-schema";

export const projects = pgTable("project", {
	resumeId: uuid().references(() => resumes.id),
	name: varchar({ length: 128 }).notNull(),
	link: varchar({ length: 128 }),
	...defaultColumns,
});

export const projectRelations = relations(projects, ({ one }) => ({
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
