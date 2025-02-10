import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/auth';
import { compileAndRun } from '$lib/server/compiler';

export const load: PageServerLoad = (event) => {
	return {
		user: event.locals.user
	};
};

export const actions: Actions = {
	signout: async (event) => {
		if (event.locals.session === null) {
			return fail(401);
		}
		await invalidateSession(event.locals.session.id);
		deleteSessionTokenCookie(event);
		return redirect(302, '/');
	},
	compile: async ({ request }) => {
		const data = await request.formData();
		const code = data.get('code');
		console.log('got code on server', code);

		const result = await compileAndRun(code ? code.toString() : '');
		console.log('Compiled:\n', result);

		return { success: true };
	}
};
