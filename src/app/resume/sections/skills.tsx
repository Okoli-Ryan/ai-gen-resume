import { GlobalStyles } from "@/lib/constants";
import { TSkill } from "@/lib/types";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

import Section from "../components/section";

type SkllsProps = {
	skills: TSkill[];
};

const Skills = ({ skills }: SkllsProps) => {
	return (
		<Section title="Skills">
			<View style={styles.container}>
				{skills.map((skill) => (
					<Text key={skill.category}>
						<Text style={[GlobalStyles.uppercase, GlobalStyles.bold]}>{skill.category}:</Text> {skill.items.join(", ")}
					</Text>
				))}
			</View>
		</Section>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		gap: 4,
	},
});

export default Skills;
