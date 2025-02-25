import fs from "fs-extra";
import dotenv from "dotenv";
import { TableList } from "./table-list";
import { getTableName } from "drizzle-orm";
import { db } from "..";

dotenv.config();

// List of schemas

async function seedDatabase() {
    console.log("Seeding database...");

    const backup = JSON.parse(fs.readFileSync("backup.json", "utf8"));

    for (const schema of TableList) {
        const tableName = getTableName(schema);
	  console.log(backup[tableName])
        if (backup[tableName]?.length) {
		const formattedData = backup[tableName].map((entry: string) => {
			return Object.fromEntries(
			    Object.entries(entry).map(([key, value]) => {
				  // Check if value is a string and can be parsed as a date
				  if (typeof value === "string" && !isNaN(Date.parse(value))) {
					return [key, new Date(value)]; // Convert to Date object
				  }
				  return [key, value];
			    })
			);
		  });

		  await db.insert(schema).values(formattedData).onConflictDoNothing();
    console.log(`Seeded table: ${tableName} ✅`);
        }
    }

    console.log("Database seeding complete ✅");
}

async function main() {
    try {
        await seedDatabase();
    } catch (error) {
        console.error("Seeding failed ❌", error);
    }
}

main();
