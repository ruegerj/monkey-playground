import { env } from '$env/dynamic/public';
import { z } from 'zod';

export const maxCodeChars = parseInt(env.PUBLIC_MAX_ALLOWED_CHARS_CODE ?? '1000');

export const snippetFormSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, 'Name must be at least 2 characters long')
		.max(100, "Name mustn't be longer than 100 characters"),
	code: z
		.string()
		.trim()
		.nonempty('Code cannot be empty')
		.max(maxCodeChars, `Code mustn't exceed ${maxCodeChars} characters`)
});

export const SnippetFormSchema = typeof snippetFormSchema;
