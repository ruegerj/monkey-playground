import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { env } from '$env/dynamic/private';
import * as schema from './schema';
import { building } from '$app/environment';

let client: Database.Database | undefined = undefined;

if (!building) {
	if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
	client = new Database(env.DATABASE_URL);
}

export const db = drizzle({
	client,
	schema
});
