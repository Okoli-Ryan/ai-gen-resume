import { TPersonalInfo } from "@/lib/types";
import { Link, StyleSheet, Text, View } from "@react-pdf/renderer";

const PersonalInfo = ({ personalInfo }: { personalInfo: TPersonalInfo }) => {
	return (
		<>
			<Text style={[styles.headerText, { fontFamily: "Times-Bold" }]}>
				{personalInfo.name} - {personalInfo.title}
			</Text>
			<View style={styles.personalInfo}>
				<Text>
					<Text style={styles.personalInfoText}>{personalInfo.location}</Text> |
					<Text>
						{" "}
						<Link src={personalInfo.linkedinUrl} style={styles.personalInfoText}>
							LinkedIn
						</Link>{" "}
					</Text>
					|
					<Text>
						{" "}
						<Link src={`tel:${personalInfo.phoneNumber}`} style={styles.personalInfoText}>
							+2347025939563
						</Link>{" "}
					</Text>
					|
					<Text>
						{" "}
						<Link src={`mailto:${personalInfo.email}`} style={styles.personalInfoText}>
							okoliryan50@gmail.com
						</Link>{" "}
					</Text>
					|
					<Text>
						{" "}
						<Link src={personalInfo.githubUrl} style={styles.personalInfoText}>
							Github
						</Link>{" "}
					</Text>
					|
					<Text>
						{" "}
						<Link src={personalInfo.portfolioUrl} style={styles.personalInfoText}>
							Portfolio
						</Link>{" "}
					</Text>
				</Text>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	personalInfo: {
		justifyContent: "center",
		textAlign: "center",
		paddingTop: 8,
		marginBottom: 4,
	},
	personalInfoText: {
		fontFamily: "Times-Roman",
	},
	headerText: {
		fontSize: 18,
		textAlign: "center",
		fontWeight: 700,
	},
});

export default PersonalInfo;
