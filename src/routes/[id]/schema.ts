import { env } from '$env/dynamic/public';
import { z } from 'zod';

export const maxCodeChars = parseInt(env.PUBLIC_MAX_ALLOWED_CHARS_CODE ?? '1000');

export const snippetFormSchema = z.object({
	name: z
		.string()
		.min(2, 'Name must be at least 2 characters long')
		.max(100, "Name mustn't be longer than 100 characters"),
	code: z.string().min(1).max(maxCodeChars)
});

export const SnippetFormSchema = typeof snippetFormSchema;
