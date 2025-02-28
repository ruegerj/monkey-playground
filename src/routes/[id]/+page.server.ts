import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { compileAndRun } from '$lib/server/compiler';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { maxCodeChars, snippetFormSchema } from './schema';
import { validate } from 'uuid';
import {
	createSnippet,
	deleteSnippetById,
	getSnippetById,
	updateSnippetById,
	type Snippet
} from '$lib/server/router/snippet';

const UNSAVED_SNIPPET_ID = 'new';

export const load: PageServerLoad = async ({ params }) => {
	const snippetId = params.id;
	if (snippetId !== UNSAVED_SNIPPET_ID && !validate(snippetId)) {
		return error(404, 'Snippet not found');
	}

	const saveForm = await superValidate(zod(snippetFormSchema));

	let snippet: Snippet | undefined;
	if (snippetId !== UNSAVED_SNIPPET_ID) {
		snippet = await getSnippetById(snippetId);
		if (!snippet) {
			return error(404, 'Snippet not found');
		}

		saveForm.data.name = snippet.name;
		saveForm.data.code = snippet.code;
	}

	return {
		snippet: snippet,
		saveForm: saveForm
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

		const result = await compileAndRun(code);

		return { success: true, result: result };
	},
	saveSnippet: async (event) => {
		if (!event.locals.session || !event.locals.user) {
			return fail(401);
		}

		const form = await superValidate(event, zod(snippetFormSchema));
		if (!form.valid) {
			return fail(422, {
				form
			});
		}

		const snippetId = event.params.id;
		const userId = event.locals.user.id;

		if (!snippetId) {
			return fail(400);
		}

		const { name, code } = form.data;

		// create new snippet
		if (snippetId === UNSAVED_SNIPPET_ID) {
			const created = await createSnippet(name, code, userId!);
			return redirect(302, `/${created.id}`);
		}

		// update existing
		const existing = await getSnippetById(snippetId);

		if (!existing) {
			return fail(400);
		}

		if (existing.userId !== userId) {
			return fail(404); // do not leak existence of other snippets
		}

		const updatedSnippet = await updateSnippetById(existing.id, name, code);

		return {
			saveForm: form,
			snippet: updatedSnippet
		};
	},
	deleteSnippet: async ({ locals, params }) => {
		if (!locals.session || !locals.user) {
			return fail(401);
		}

		const snippetId = params.id;
		const userId = locals.user.id;

		if (!snippetId || snippetId === UNSAVED_SNIPPET_ID) {
			return fail(400);
		}

		const existing = await getSnippetById(snippetId);

		if (!existing || existing.userId !== userId) {
			return fail(404); // do not leak existence of other snippets
		}

		await deleteSnippetById(snippetId);

		return redirect(302, '/');
	}
} satisfies Actions;
