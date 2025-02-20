import { eq, InferInsertModel } from "drizzle-orm";

import { db as dbClient } from "../";
import { users } from "../schema";

export class UserRepository {
    constructor(private db: typeof dbClient) {}

    createUser(user: InferInsertModel<typeof users>) {
        return this.db.insert(users).values(user);
    }

    getUserByEmail(email: string) {
        return this.db.query.users.findFirst({ where: eq(users.email, email) });
    }
}