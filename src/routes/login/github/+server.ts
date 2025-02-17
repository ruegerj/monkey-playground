import { isRunningIn } from '$lib/server/env';
import { github } from '$lib/server/oauth';
import type { RequestEvent } from '@sveltejs/kit';
import { generateState } from 'arctic';
import * as auth from '$lib/server/auth';

export async function GET(event: RequestEvent): Promise<Response> {
	if (isRunningIn('ci')) {
		return createTestUserImpersonationResponse();
	}

	const state = generateState();
	const url = github.createAuthorizationURL(state, []);

	event.cookies.set('github_oauth_state', state, {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax'
	});

	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString()
		}
	});
}

function createTestUserImpersonationResponse(): Response {
	return new Response(null, {
		status: 302,
		headers: {
			Location: '/',
			'Set-Cookie': `${auth.sessionCookieName}=9999; Path=/` // any cookie value will suffice, since checks are canceled out in CI env
		}
	});
}
