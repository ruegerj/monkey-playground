import { GitHub } from 'arctic';
import { env } from '$env/dynamic/private';
import { building } from '$app/environment';

if (!building) {
	if (!env.GITHUB_CLIENT_ID) throw new Error('GITHUB_CLIENT_ID is not set');
	if (!env.GITHUB_CLIENT_SECRET) throw new Error('GITHUB_CLIENT_SECRET is not set');
}

export const github = new GitHub(env.GITHUB_CLIENT_ID!, env.GITHUB_CLIENT_SECRET!, null);
