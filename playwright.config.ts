import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'bun run build && bun run preview',
		port: 4173,
		env: {
			NODE_ENV: 'ci'
		}
	},

	testDir: 'e2e'
});
