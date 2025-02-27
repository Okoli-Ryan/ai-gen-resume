import EducationForm from "@/app/components/edit-form/education-form";
import PersonalInfoForm from "@/app/components/edit-form/personal-info-form";
import ProjectForm from "@/app/components/edit-form/projects-form";
import SkillsForm from "@/app/components/edit-form/skills-form";
import SummaryForm from "@/app/components/edit-form/summary-form";
import WorkExperienceForm from "@/app/components/edit-form/work-experience-form";
import { StyleSheet } from "@react-pdf/renderer";

export const GlobalStyles = StyleSheet.create({
	link: {
		color: "blue",
		fontFamily: "Times-Italic",
	},
	italic: {
		fontFamily: "Times-Italic",
	},
	bold: {
		fontFamily: "Times-Bold",
	},
	uppercase: {
		textTransform: "uppercase",
	},
});


export const ResumeFormSections = [PersonalInfoForm, SummaryForm, WorkExperienceForm, ProjectForm, EducationForm, SkillsForm]