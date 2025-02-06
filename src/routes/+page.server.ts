import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/auth';

export const load: PageServerLoad = (event) => {
	return {
		user: event.locals.user
	};
};

export const actions: Actions = {
	default: async (event) => {
		if (event.locals.session === null) {
			return fail(401);
		}
		await invalidateSession(event.locals.session.id);
		deleteSessionTokenCookie(event);
		return redirect(302, '/');
	}
};
