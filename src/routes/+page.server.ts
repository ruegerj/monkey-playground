import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { compileAndRun } from '$lib/server/compiler';
import { MAX_ALLOWED_CHARS_CODE } from '$env/static/private';

export const load: PageServerLoad = (event) => {
	return {
		user: event.locals.user
	};
};

export const actions = {
	compile: async ({ request, locals }) => {
		if (!locals.session || !locals.user) {
			return fail(401);
		}

		const data = await request.formData();
		const code = data.get('code')?.toString().trim();

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
