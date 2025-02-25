import { getTableName, sql } from "drizzle-orm";
import fs from "fs-extra";
import { TableList } from "./table-list";
import { db } from "..";


async function backupData() {
    console.log("Fetching data from database...");

    const backup: Record<string, any[]> = {};

    for (const schema of TableList) {
        const tableName = getTableName(schema);
	  console.log({tableName})
        backup[tableName] = await db.select().from(schema);
    }

    await fs.writeJson("backup.json", backup, { spaces: 2 });
    console.log("Backup saved to backup.json ✅");
}

async function resetDatabase() {
    console.log("Resetting database...");

    for (const schema of TableList) {
        const tableName = getTableName(schema);

        // Check if the table exists before truncating
        const tableExists = await db.execute(
            sql`SELECT EXISTS (
                SELECT 1 FROM information_schema.tables 
                WHERE table_name = ${tableName}
            ) AS "exists";`
        );

        // If the table exists, truncate it
	//   @ts-ignore
        if (tableExists[0]?.exists) {
            await db.execute(sql`TRUNCATE TABLE ${sql.raw(tableName)} RESTART IDENTITY CASCADE`);
            console.log(`Truncated table: ${tableName} ✅`);
        } else {
            console.log(`Skipping: ${tableName} does not exist ❌`);
        }
    }
}


async function main() {
    try {
      //   await backupData();
        await resetDatabase();
        console.log("Migration complete ✅");
    } catch (error) {
        console.error("Migration failed ❌", error);
    }
}

main();
