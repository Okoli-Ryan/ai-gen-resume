import { InferInsertModel } from 'drizzle-orm';

import { db } from '../';
import { getUserByEmail } from '../repositories/user-repository';
import { usersTable } from '../schema';

export async function findOrCreateUser(user: InferInsertModel<typeof usersTable>) {
	const existingUser = await getUserByEmail(user.email);
	if (existingUser) return existingUser;

	const [newUser] = await db.insert(usersTable).values(user).returning();

    return newUser
}
