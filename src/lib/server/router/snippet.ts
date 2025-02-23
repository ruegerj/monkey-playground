import { eq } from 'drizzle-orm';
import { db } from '../db';
import { snippet } from '../db/schema';
import { v4 as uuidV4 } from 'uuid';

export type Snippet = typeof snippet.$inferSelect;
export type NewSnippet = typeof snippet.$inferInsert;

export async function getSnippetById(uuid: string): Promise<Snippet | undefined> {
	return db.query.snippet.findFirst({
		where: eq(snippet.id, uuid)
	});
}

export async function createSnippet(name: string, code: string, ownerId: string): Promise<Snippet> {
	if (!name) {
		throw new Error('Name of snippet is required');
	}
	if (!code) {
		throw new Error("Code of snippet mustn't be empty");
	}

	const newSnippet: NewSnippet = {
		id: uuidV4(),
		name: name,
		code: code,
		userId: ownerId,
		updatedAt: new Date()
	};

	const [createdSnippet] = await db.insert(snippet).values(newSnippet).returning();
	return createdSnippet;
}

export async function updateSnippetById(
	uuid: string,
	name: string,
	code: string
): Promise<Snippet> {
	if (!name) {
		throw new Error('Name of snippet is required');
	}
	if (!code) {
		throw new Error("Code of snippet mustn't be empty");
	}

	const snippetToUpdate = await getSnippetById(uuid);
	if (!snippetToUpdate) {
		throw new Error(`Failed to update snippet (id=${uuid}) which doesn't exist`);
	}

	const [updatedSnippet] = await db
		.update(snippet)
		.set({
			code: code,
			name: name
		})
		.where(eq(snippet.id, uuid))
		.returning();
	return updatedSnippet;
}
