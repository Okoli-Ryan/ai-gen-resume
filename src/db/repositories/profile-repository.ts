import { InferInsertModel } from 'drizzle-orm';

import { db as dbClient } from '../';
import { profiles } from '../schema';

export class ProfileRepository {

    constructor(private db: typeof dbClient) {}
    
	createUserProfile(profile: InferInsertModel<typeof profiles>) {
		return this.db.insert(profiles).values(profile);
	}
}
