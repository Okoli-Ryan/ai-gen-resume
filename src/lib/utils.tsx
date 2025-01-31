import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Link } from "@react-pdf/renderer";

import { GlobalStyles } from "./constants";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const TextConfig = [
	{
		regex: /\((.*?)\)\[(.*?)\]/g, // Match link format "(linkText)[link]"
		fn: (key: string, result: string) => (
			<Link key={key} src={result[2]} style={GlobalStyles.link}>
				{result[1]}
			</Link>
		),
	},
	{
		regex: /_(.*?)_/g, // Match italic format "_text_"
		fn: (key: string, result: string) => <em key={key}>{result[1]}</em>,
	},
	{
		regex: /\*(.*?)\*/g, // Match bold format "*text*"
		fn: (key: string, result: string) => <strong key={key}>{result[1]}</strong>,
	},
];
