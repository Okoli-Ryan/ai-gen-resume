import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { defaultColumns } from "./common";
import { relations } from "drizzle-orm";
import { users } from "./user-schema";
import { workExperience } from "./work-experience-schema";
import { projects } from "./project-schema";
import { skills } from "./skill-schema";
import { education } from "./education-schema";

export const profiles = pgTable("profile", {
    userId: text()
        .notNull()
        .references(() => users.id),
    role: varchar({ length: 64 }).notNull(),
    summary: text(),
    location: varchar({ length: 64 }).notNull(),
    phoneNumber: varchar({ length: 32 }),
    linkedinUrl: varchar({ length: 128 }),
    githubUrl: varchar({ length: 128 }),
    portfolioUrl: varchar({ length: 128 }),
    ...defaultColumns,
});

export const profileRelations = relations(profiles, ({ many, one }) => ({
    user: one(users, {
        fields: [profiles.userId],
        references: [users.id],
        relationName: "user_profiles",
    }),
    workExperience: many(workExperience, {
        relationName: "profile_workExperience",
    }),
    projects: many(projects, { relationName: "profile_projects" }),
    skills: many(skills, { relationName: "profile_skills" }),
    education: many(education, { relationName: "profile_education" }),
}));
