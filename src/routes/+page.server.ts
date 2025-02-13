import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/auth';
import { compileAndRun } from '$lib/server/compiler';
import { MAX_ALLOWED_CHARS_CODE } from '$env/static/private';

export const load: PageServerLoad = (event) => {
	return {
		user: event.locals.user
	};
};

export const actions = {
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
		const code = data.get('code')?.toString();

		if (!code?.length) {
			return fail(422, { error: 'Code cannot be empty.' });
		}

		if (code.length > parseInt(MAX_ALLOWED_CHARS_CODE)) {
			return fail(422, {
				error: 'Code exceeds maximum length which is allowed to be compiled.'
			});
		}

		const result = await compileAndRun(code ? code.toString() : '');

		return { success: true, result: result };
	}
} satisfies Actions;
