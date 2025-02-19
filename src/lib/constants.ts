import EducationForm from "@/app/resume/edit-form/education-form";
import PersonalInfoForm from "@/app/resume/edit-form/personal-info-form";
import SkillsForm from "@/app/resume/edit-form/skills-form";
import SummaryForm from "@/app/resume/edit-form/summary-form";
import WorkExperienceForm from "@/app/resume/edit-form/work-experience-form";
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


export const ResumeFormSections = [PersonalInfoForm, SummaryForm, WorkExperienceForm, EducationForm, SkillsForm]