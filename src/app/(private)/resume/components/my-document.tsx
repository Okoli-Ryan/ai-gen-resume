import { EducationData, PersonalInformation, ProjectsData, SkillsData, SummaryInfo, WorkExperiences } from "@/lib/data";
import { Document, Page, StyleSheet, View } from "@react-pdf/renderer";

import Education from "../../../components/sections/education";
import PersonalInfo from "../../../components/sections/personal-info";
import Projects from "../../../components/sections/projects";
import Skills from "../../../components/sections/skills";
import Summary from "../../../components/sections/summary";
import WorkExperience from "../../../components/sections/work-experience";

export const MyDocument = () => (
	<Document>
		<Page size="A4" style={styles.page}>
			<PersonalInfo personalInfo={PersonalInformation} />
			<View style={styles.sectionContainer}>
				<Summary summary={SummaryInfo} />
				<WorkExperience experiences={WorkExperiences} />
				<Projects projects={ProjectsData} />
				<Skills skills={SkillsData} />
				<Education educationList={EducationData} />
			</View>
		</Page>
	</Document>
);

// Create styles
const styles = StyleSheet.create({
	page: {
		fontFamily: "Times-Roman",
		fontSize: 10,
		paddingHorizontal: 64,
		paddingTop: 92,
		paddingBottom: 16,
	},

	sectionContainer: {
		display: "flex",
		gap: 8,
	},
});
