import { pgTable, text } from "drizzle-orm/pg-core";
import { defaultColumns } from "./common";

export const bulletPoints = pgTable("bulletPoint", {
	text: text().notNull(),
	...defaultColumns,
});
