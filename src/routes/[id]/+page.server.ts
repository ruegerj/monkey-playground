import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { compileAndRun } from '$lib/server/compiler';
import { env } from '$env/dynamic/private';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { snippetNameFormSchema } from './schema';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(snippetNameFormSchema))
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

		if (code.length > parseInt(env.MAX_ALLOWED_CHARS_CODE ?? '1000')) {
			return fail(422, {
				error: 'Code exceeds maximum length which is allowed to be compiled.'
			});
		}

		const result = await compileAndRun(code ? code.toString() : '');

		return { success: true, result: result };
	}
} satisfies Actions;
