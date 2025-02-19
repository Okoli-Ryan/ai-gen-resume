import { InferInsertModel } from 'drizzle-orm';

import { db as dbClient } from '../';
import { profileTable } from '../schema';

export class ProfileRepository {

    constructor(private db: typeof dbClient) {}
    
	createUserProfile(profile: InferInsertModel<typeof profileTable>) {
		return this.db.insert(profileTable).values(profile);
	}
}
