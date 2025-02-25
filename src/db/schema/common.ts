import { randomUUID } from "crypto";
import { boolean, text, timestamp } from "drizzle-orm/pg-core";

export const defaultColumns = {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	activeStatus: boolean().default(true),
	createdAt: timestamp().notNull().defaultNow(),
	updatedAt: timestamp()
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
};
