import { eq, InferInsertModel } from 'drizzle-orm';

import { db } from '../';
import { usersTable } from '../schema';

export function createUser(user: InferInsertModel<typeof usersTable>) {
	return db.insert(usersTable).values(user);
}

export function getUserByEmail(email: string) {
	return db.query.usersTable.findFirst({ where: eq(usersTable.email, email) });
}
