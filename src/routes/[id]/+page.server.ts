import { error, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { compileAndRun } from '$lib/server/compiler';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { maxCodeChars, snippetFormSchema } from './schema';
import { validate } from 'uuid';

const UNSAVED_SNIPPET_ID = 'new';

export const load: PageServerLoad = async ({ params }) => {
	const snippetId = params.id;
	if (snippetId !== UNSAVED_SNIPPET_ID && !validate(snippetId)) {
		return error(404, 'Snippet not found');
	}

	return {
		form: await superValidate(zod(snippetFormSchema))
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

		if (code.length > maxCodeChars) {
			return fail(422, {
				error: 'Code exceeds maximum length which is allowed to be compiled.'
			});
		}

		const result = await compileAndRun(code ? code.toString() : '');

		return { success: true, result: result };
	}
} satisfies Actions;
