import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	githubId: integer('github_id').notNull().unique(),
	username: text('username').notNull(),
	avatarUrl: text('avatar_url')
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const snippet = sqliteTable('snippet', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(unixepoch())`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
	name: text('name').notNull(),
	code: text('code').notNull()
});

export type Snippet = typeof snippet.$inferInsert;
export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
