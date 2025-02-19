import 'dotenv/config';

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	out: "./src/db/migrations", // output directory for generated migration files
	schema: "./src/db/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
});
