import { boolean, timestamp, uuid } from "drizzle-orm/pg-core";

export const defaultColumns = {
	id: uuid()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	activeStatus: boolean().default(true),
	createdAt: timestamp().notNull().defaultNow(),
	updatedAt: timestamp()
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
};
