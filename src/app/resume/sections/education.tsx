import { GlobalStyles } from "@/lib/constants";
import { TEducation } from "@/lib/types";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

import BulletPoint from "../components/bullet-point";
import Row from "../components/row";
import Section from "../components/section";

type EducationProps = {
	educationList: TEducation[];
};

const Education = ({ educationList }: EducationProps) => {
	return (
		<Section title="Education">
			<View style={styles.experienceList}>
				{educationList.map((education) => (
					<View style={{ gap: 4 }} key={education.schoolName + education.degree + education.major}>
						<View>
							<Row>
								<Text style={GlobalStyles.bold}>
									<Text style={GlobalStyles.uppercase}>{education.schoolName}</Text>{" "}
								</Text>
								<Text style={GlobalStyles.italic}>{education.location}</Text>
							</Row>
							<Row>
								<Text style={GlobalStyles.italic}>
									{education.degree} in {education.major}
								</Text>
							</Row>
						</View>

						{/* Bullets */}
						{education.bulletPoints.map((bulletPoint, index) => (
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

export default Education;
