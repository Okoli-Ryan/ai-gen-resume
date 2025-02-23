import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { users } from '@/db/schema';

export function getResumesByUserId(userId: string) {
	return db.query.resumes.findMany({
		where: eq(users.id, userId),
	});
}
