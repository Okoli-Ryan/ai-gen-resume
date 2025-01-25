import { Text } from "@react-pdf/renderer";

import Section from "../components/section";

const Summary = ({ summary }: { summary: string }) => {
	return (
		<Section title="Summary">
			<Text>{summary}</Text>
		</Section>
	);
};

export default Summary;
