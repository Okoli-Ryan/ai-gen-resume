// @ts-expect-error missing types
import processString from "react-process-string";

import { TextConfig } from "@/lib/utils";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

const BulletPoint = ({ text }: { text: string }) => {
	return (
		<View style={styles.bulletPoint}>
			<View style={styles.bullet}></View>
			<Text>{processString(TextConfig)(text)}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	bulletPoint: {
		display: "flex",
		flexDirection: "row",
		gap: 6,
	},
	bullet: {
		width: 4,
		height: 4,
		borderRadius: 99999,
		position: "relative",
		top: 4,
		backgroundColor: "black",
	},
});

export default BulletPoint;
