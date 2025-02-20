import { Fragment } from "react";

import { GlobalStyles } from "@/lib/constants";
import { TWorkExperience } from "@/lib/types";
import { Link, StyleSheet, Text, View } from "@react-pdf/renderer";

import BulletPoint from "../bullet-point";
import Row from "../../resume/components/row";
import Section from "../../resume/components/section";

type WorkExperienceProps = {
	experiences: TWorkExperience[];
};

const WorkExperience = ({ experiences }: WorkExperienceProps) => {
	return (
		<Section title="Work Experience">
			<View style={styles.experienceList}>
				{experiences.map((experience) => (
					<View style={{ gap: 4 }} key={experience.companyName + experience.title}>
						<View>
							<Row>
								<Text style={GlobalStyles.bold}>
									<Text style={GlobalStyles.uppercase}>{experience.companyName}</Text>{" "}
									{experience.companyLink && (
										<>
											-{" "}
											<Link style={GlobalStyles.link} src={experience.companyLink}>
												{experience.companyLink}
											</Link>
										</>
									)}
								</Text>
								<Text style={GlobalStyles.italic}>{experience.location}</Text>
							</Row>
							<Row>
								<Text style={GlobalStyles.italic}>{experience.title}</Text>
								<Text style={GlobalStyles.italic}>
									{experience.startDate} - {experience.endDate}
								</Text>
							</Row>
						</View>

						{/* Bullets */}
						{experience.bulletPoints.map((bulletPoint, index) => (
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

export default WorkExperience;
