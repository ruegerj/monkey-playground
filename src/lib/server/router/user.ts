import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidV4 } from 'uuid';

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;

export async function getUserByGithubId(githubId: number): Promise<User | undefined> {
	return db.query.user.findFirst({
		where: eq(user.githubId, githubId)
	});
}

export async function createUser(
	githubId: number,
	username: string,
	avatarUrl: string
): Promise<User> {
	if (!githubId || !username) {
		throw new Error('githubId and username are required');
	}

	const newUser: NewUser = {
		id: uuidV4(),
		githubId: githubId,
		username: username,
		avatarUrl: avatarUrl
	};

	const [createdUser] = await db.insert(user).values(newUser).returning();
	return createdUser;
}
