import { workExperience } from './work-experience-schema';
import { pgTable, text } from "drizzle-orm/pg-core";
import { defaultColumns } from "./common";
import { relations } from "drizzle-orm";
import { education } from './education-schema';

export const bulletPoints = pgTable("bulletPoint", {
	text: text().notNull(),
	workExperienceId: text().references(() => workExperience.id),
	educationId: text().references(() => education.id),
	projectId: text().references(() => workExperience.id),
	...defaultColumns,
});

export const bulletPointsRelations = relations(bulletPoints, ({ one }) => ({
	workExperience: one(workExperience, {
		fields: [bulletPoints.workExperienceId],
		references: [workExperience.id],
		relationName: "workExperience_bulletPoints",
	}),
	education: one(education, {
		fields: [bulletPoints.educationId],
		references: [education.id],
		relationName: "education_bulletPoints",
	}),
	project: one(workExperience, {
		fields: [bulletPoints.projectId],
		references: [workExperience.id],
		relationName: "project_bulletPoints",
	}),
}));