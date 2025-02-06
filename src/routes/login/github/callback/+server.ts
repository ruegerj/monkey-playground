import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/auth';
import { github } from '$lib/server/oauth';
import type { GitHubUser } from '$lib/server/oauth/github-user';
import { createUser, getUserByGithubId, type User } from '$lib/server/router/user';
import type { RequestEvent } from '@sveltejs/kit';
import type { OAuth2Tokens } from 'arctic';

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('github_oauth_state') ?? null;
	if (code === null || state === null || storedState === null) {
		return new Response(null, {
			status: 400
		});
	}
	if (state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await github.validateAuthorizationCode(code);
	} catch (e) {
		console.warn('Failed to authenticate via GitHub: ', e);
		// invalid code or clients credentials
		return new Response(null, {
			status: 400
		});
	}

	const githubUserResponse = await fetch('https://api.github.com/user', {
		headers: {
			Authorization: `Bearer ${tokens.accessToken()}`
		}
	});
	const githubUser: GitHubUser = await githubUserResponse.json();

	const existingUser = await getUserByGithubId(githubUser.id);
	if (existingUser) {
		console.log(`Found existing user: ${existingUser.id}, proceeding to authenticate...`);
		return authenticate(event, existingUser);
	}

	const createdUser = await createUser(githubUser.id, githubUser.login, githubUser.avatar_url);
	console.log(`Created user with name: ${githubUser.login}`);
	return authenticate(event, createdUser);
}

async function authenticate(event: RequestEvent, user: User): Promise<Response> {
	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, user.id);
	setSessionTokenCookie(event, sessionToken, session.expiresAt);

	console.log(`Authenticated user: ${user.id} until: ${session.expiresAt}`);

	return new Response(null, {
		status: 302,
		headers: {
			Location: '/'
		}
	});
}
