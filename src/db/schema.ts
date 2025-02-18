import { sql } from "drizzle-orm";
import { boolean, date, pgTable, text, timestamp, unique, uuid, varchar } from "drizzle-orm/pg-core";

const defaultColumns = {
	id: uuid().primaryKey().defaultRandom(),
	createdAt: timestamp().notNull().defaultNow(),
	updatedAt: timestamp().notNull().defaultNow().$onUpdate(() => new Date()).notNull(),
}

export const usersTable = pgTable("user", {
	...defaultColumns
})

export const resumeTable = pgTable("resumes", {
	name: varchar().notNull(),
	userId: uuid().references(() => usersTable.id),
	jobDescription: text(),
	isPublished: boolean().default(false),
	role: varchar({length: 64}),
	workExperience: uuid().references(() => workExperienceTable.id),
	projects: uuid().references(() => projects.id),
	skills: uuid().references(() => skillsTable.id),
	...defaultColumns
}, t => [
	unique().on(t.id, t.userId)
])

export const workExperienceTable = pgTable("workExperience", {
	companyName: varchar({length: 128}).notNull(),
	companyLink: varchar({length: 128}),
	title: varchar({length: 64}).notNull(),
	startDate: date({mode: "string"}).notNull(),
	endDate: date({mode: "string"}),
	location: varchar({length: 64}).notNull(),
	bulletPoints: uuid().references(() => bulletPointTable.id),
	...defaultColumns
})

export const personalInfo = pgTable("personalInfo", {
	name: varchar({length: 64}).notNull(),
	title: varchar({length: 64}).notNull(),
	location: varchar({length: 64}).notNull(),
	linkedinUrl: varchar({length: 64}).notNull(),
	phoneNumber: varchar({length: 32}).notNull(),
	email: varchar({length: 64}).notNull(),
	githubUrl: varchar({length: 64}).notNull(),
	portfolioUrl: varchar({length: 64}).notNull(),
})

export const projects = pgTable("projects", {
	name: varchar({length: 128}).notNull(),
	link: varchar({length: 128}),
	bulletPoints: uuid().references(() => bulletPointTable.id),
	...defaultColumns
})

export const educationTable = pgTable("education", {
	schoolName: varchar({length: 128}).notNull(),
	degree: varchar({length: 64}).notNull(),
	major: varchar({length: 64}).notNull(),
	location: varchar({length: 64}).notNull(),
	bulletPoints: uuid().references(() => bulletPointTable.id),
	...defaultColumns
})

export const skillsTable = pgTable("skills", {
    category: varchar({ length: 64 }),
    items: varchar({length: 128}).array().notNull().default(sql`ARRAY[]::text[]`),
    ...defaultColumns
});


export const profileTable = pgTable("profile", {
	userId: uuid().references(() => usersTable.id),
	summary: text(),
	title: varchar({length: 64}).notNull(),
	location: varchar({length: 64}).notNull(),
	linkedinUrl: varchar({length: 64}).notNull(),
	phoneNumber: varchar({length: 32}).notNull(),
	email: varchar({length: 64}).notNull(),
	githubUrl: varchar({length: 64}).notNull(),
	portfolioUrl: varchar({length: 64}).notNull(),
	workExperience: uuid().references(() => workExperienceTable.id),
	projects: uuid().references(() => projects.id),
	skills: uuid().references(() => skillsTable.id),
	...defaultColumns
})

export const bulletPointTable = pgTable("bulletPoints", {
	text: text().notNull(),
	...defaultColumns
})