import { InferInsertModel } from "drizzle-orm";

import { db } from "../";
import {
	UserRepository
} from "../repositories/user-repository";
import { users } from "../schema";

export class UserService {
    userRepository: UserRepository;

    constructor() {
	this.userRepository = new UserRepository(db);
    }

    async findOrCreateUser(user: InferInsertModel<typeof users>) {
        const existingUser = await this.userRepository.getUserByEmail(
            user.email
        );
        if (existingUser) return existingUser;

        const [newUser] = await db.insert(users).values(user).returning();

        return newUser;
    }
}

export const userService = new UserService();
