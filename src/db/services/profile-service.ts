import { InferInsertModel } from 'drizzle-orm';

import { db } from '../';
import { ProfileRepository } from '../repositories/profile-repository';
import { profileTable } from '../schema';

export class ProfileService {
	profileRepository: ProfileRepository;

	constructor() {
		this.profileRepository = new ProfileRepository(db);
	}

	createProfile(profile: InferInsertModel<typeof profileTable>) {
		return this.profileRepository.createUserProfile(profile);
	}
}

export const profileService = new ProfileService();
