import { InferSelectModel } from 'drizzle-orm';

import { usersTable } from '@/db/schema';

declare module "next-auth" {
	interface Session {
		user: InferSelectModel<typeof usersTable>;
	}
}

declare module "@auth/core/jwt" {
	interface JWT {
		user: InferSelectModel<typeof usersTable>;
	}
}
