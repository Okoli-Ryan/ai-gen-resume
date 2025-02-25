import { accounts, authenticators, bulletPoints, bulletPointsRelations, education, educationRelations, projectRelations, projects, resumeRelations, sessions, skills, skillsRelations, userRelations, users, verificationTokens, workExperience, workExperienceRelations } from "../schema";

export const TableList = [
	workExperience,
	bulletPoints,
	skills,
	projects,
	education,
	users,
	// userRelations.table,
	// bulletPointsRelations.table,
	// userRelations.table,
	// skillsRelations.table,
	// projectRelations.table,
	// educationRelations.table,
	// resumeRelations.table,
	// workExperienceRelations.table,
	accounts,
	sessions,
	verificationTokens,
	authenticators,
]