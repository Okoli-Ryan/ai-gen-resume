import {
    boolean,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { resumes } from "./resume-schema";
import { profiles } from "./profile-schema";
import { relations } from "drizzle-orm";

export const users = pgTable("user", {
    id: text()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    name: varchar({ length: 64 }).notNull(),
    email: varchar({ length: 64 }).notNull().unique(),
    activeStatus: boolean().default(true),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp()
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
});

export const userRelations = relations(users, ({ many }) => ({
    resumes: many(resumes, { relationName: "user_resumes" }),
    profiles: many(profiles, { relationName: "user_profiles" }),
}));
