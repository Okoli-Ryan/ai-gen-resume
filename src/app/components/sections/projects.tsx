import { GlobalStyles } from "@/lib/constants";
import { TProject } from "@/lib/types";
import { Link, StyleSheet, Text, View } from "@react-pdf/renderer";

import BulletPoint from "../bullet-point";
import Row from "../../(private)/resume/components/row";
import Section from "../../(private)/resume/components/section";

type ProjectProps = {
	projects: TProject[];
};

const Projects = ({ projects }: ProjectProps) => {
	return (
		<Section title="Projects">
			<View style={styles.experienceList}>
				{projects.map((project) => (
					<View style={{ gap: 4 }} key={project.name}>
						<View>
							<Row>
								<Text style={GlobalStyles.bold}>
									<Text style={GlobalStyles.uppercase}>{project.name}</Text> - <Link style={GlobalStyles.link}>{project.link}</Link>
								</Text>
							</Row>
						</View>

						{/* Bullets */}
						{project.bulletPoints.map((bulletPoint, index) => (
							<BulletPoint text={bulletPoint} key={index} />
						))}
					</View>
				))}
			</View>
		</Section>
	);
};

const styles = StyleSheet.create({
	experienceList: {
		display: "flex",
		gap: 16,
	},
});
export default Projects;
