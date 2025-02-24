import { getSnippetsOfUser, type Snippet } from '$lib/server/router/snippet';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	let snippets: Snippet[] = [];

	if (event.locals.user) {
		snippets = await getSnippetsOfUser(event.locals.user.id);
	}

	return {
		user: event.locals.user,
		snippets: snippets
	};
};
