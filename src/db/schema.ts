import { relations, sql } from "drizzle-orm";
import { boolean, date, pgTable, text, timestamp, unique, uuid, varchar } from "drizzle-orm/pg-core";

const defaultColumns = {
	id: uuid().primaryKey().defaultRandom(),
	activeStatus: boolean().default(true),
	createdAt: timestamp().notNull().defaultNow(),
	updatedAt: timestamp()
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
};

export const usersTable = pgTable("users", {
	name: varchar({ length: 64 }).notNull(),
	email: varchar({ length: 64 }).notNull().unique(),
	phoneNumber: varchar({ length: 32 }).notNull(),
	linkedinUrl: varchar({ length: 128 }),
	githubUrl: varchar({ length: 128 }),
	portfolioUrl: varchar({ length: 128 }),
	...defaultColumns,
});

export const userRelations = relations(usersTable, ({ many }) => ({
	resumes: many(resumeTable, { relationName: "user_resumes" }),
	profiles: many(profileTable, { relationName: "user_profiles" }),
}));

export const resumeTable = pgTable(
	"resumes",
	{
		name: varchar({ length: 64 }).notNull(),
		summary: text(),
		userId: uuid()
			.notNull()
			.references(() => usersTable.id),
		jobDescription: text(),
		isPublished: boolean().default(false),
		role: varchar({ length: 64 }),
		...defaultColumns,
	},
	(t) => [unique().on(t.id, t.userId)]
);

export const resumeRelations = relations(resumeTable, ({ many, one }) => ({
	user: one(usersTable, {
		fields: [resumeTable.userId],
		references: [usersTable.id],
		relationName: "user_resumes",
	}),
	education: many(educationTable, { relationName: "resume_education" }),
	workExperience: many(workExperienceTable, { relationName: "resume_workExperience" }),
	projects: many(projectTable, { relationName: "resume_projects" }),
	skills: many(skillsTable, { relationName: "resume_skills" }),
}));

export const workExperienceTable = pgTable("workExperience", {
	resumeId: uuid().references(() => resumeTable.id),
	profileId: uuid().references(() => profileTable.id),
	companyName: varchar({ length: 128 }).notNull(),
	companyLink: varchar({ length: 128 }),
	title: varchar({ length: 64 }).notNull(),
	startDate: date().notNull(),
	endDate: date(),
	location: varchar({ length: 64 }).notNull(),
	...defaultColumns,
});

export const workExperienceRelations = relations(workExperienceTable, ({ one }) => ({
	profile: one(profileTable, {
		fields: [workExperienceTable.profileId],
		references: [profileTable.id],
		relationName: "profile_workExperience",
	}),
	resume: one(resumeTable, {
		fields: [workExperienceTable.resumeId],
		references: [resumeTable.id],
		relationName: "resume_workExperience",
	}),
}));

export const projectTable = pgTable("projects", {
	resumeId: uuid().references(() => resumeTable.id),
	profileId: uuid().references(() => profileTable.id),
	name: varchar({ length: 128 }).notNull(),
	link: varchar({ length: 128 }),
	...defaultColumns,
});

export const projectRelations = relations(projectTable, ({ one }) => ({
	profile: one(profileTable, {
		fields: [projectTable.profileId],
		references: [profileTable.id],
		relationName: "profile_projects",
	}),
	resume: one(resumeTable, {
		fields: [projectTable.resumeId],
		references: [resumeTable.id],
		relationName: "resume_projects",
	}),
}));

export const educationTable = pgTable("education", {
	resumeId: uuid().references(() => resumeTable.id),
	profileId: uuid().references(() => profileTable.id),
	schoolName: varchar({ length: 128 }).notNull(),
	degree: varchar({ length: 64 }).notNull(),
	major: varchar({ length: 64 }).notNull(),
	location: varchar({ length: 64 }).notNull(),
	...defaultColumns,
});

export const educationRelations = relations(educationTable, ({ one }) => ({
	profile: one(profileTable, {
		fields: [educationTable.profileId],
		references: [profileTable.id],
		relationName: "profile_education",
	}),
	resume: one(resumeTable, {
		fields: [educationTable.resumeId],
		references: [resumeTable.id],
		relationName: "resume_education",
	}),
}));

export const skillsTable = pgTable("skills", {
	category: varchar({ length: 64 }),
	resumeId: uuid().references(() => resumeTable.id),
	profileId: uuid().references(() => profileTable.id),
	items: varchar({ length: 128 })
		.array()
		.notNull()
		.default(sql`ARRAY[]::text[]`),
	...defaultColumns,
});

export const skillsRelations = relations(skillsTable, ({ one }) => ({
	profile: one(profileTable, {
		fields: [skillsTable.profileId],
		references: [profileTable.id],
		relationName: "profile_skills",
	}),
	resume: one(resumeTable, {
		fields: [skillsTable.resumeId],
		references: [resumeTable.id],
		relationName: "resume_skills",
	}),
}));

export const profileTable = pgTable("profiles", {
	userId: uuid()
		.notNull()
		.references(() => usersTable.id),
	role: varchar({ length: 64 }).notNull(),
	summary: text(),
	location: varchar({ length: 64 }).notNull(),
	...defaultColumns,
});

export const profileRelations = relations(profileTable, ({ many, one }) => ({
	user: one(usersTable, {
		fields: [profileTable.userId],
		references: [usersTable.id],
		relationName: "user_profiles",
	}),
	workExperience: many(workExperienceTable, { relationName: "profile_workExperience" }),
	projects: many(projectTable, { relationName: "profile_projects" }),
	skills: many(skillsTable, { relationName: "profile_skills" }),
	education: many(educationTable, { relationName: "profile_education" }),
}));

export const workExperienceBulletPoints = pgTable("workExperienceBulletPoints", {
	workExperienceId: uuid()
		.notNull()
		.references(() => workExperienceTable.id),
	bulletPointId: uuid()
		.notNull()
		.references(() => bulletPointTable.id),
});

export const projectBulletPoints = pgTable("projectBulletPoints", {
	projectId: uuid()
		.notNull()
		.references(() => projectTable.id),
	bulletPointId: uuid()
		.notNull()
		.references(() => bulletPointTable.id),
});

export const educationBulletPoints = pgTable("educationBulletPoints", {
	educationId: uuid()
		.notNull()
		.references(() => educationTable.id),
	bulletPointId: uuid()
		.notNull()
		.references(() => bulletPointTable.id),
});

export const bulletPointTable = pgTable("bulletPoints", {
	text: text().notNull(),
	...defaultColumns,
});
