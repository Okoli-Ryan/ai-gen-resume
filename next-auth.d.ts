import { users } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';


declare module "next-auth" {
	interface Session {
		user: InferSelectModel<typeof users>;
	}
}
