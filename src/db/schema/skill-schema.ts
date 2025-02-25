import { relations, sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";

import { defaultColumns } from "./common";
import { resumes } from "./resume-schema";

export const skills = pgTable("skill", {
	category: varchar({ length: 64 }),
	resumeId: text().references(() => resumes.id),
	items: varchar({ length: 128 })
		.array()
		.notNull()
		.default(sql`ARRAY[]::text[]`),
	...defaultColumns,
});

export const skillsRelations = relations(skills, ({ one }) => ({
	resume: one(resumes, {
		fields: [skills.resumeId],
		references: [resumes.id],
		relationName: "resume_skills",
	}),
}));
