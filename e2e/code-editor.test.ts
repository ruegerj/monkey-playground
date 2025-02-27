import { test, expect, Locator, Page } from '@playwright/test';
import { elementSelector, findElement } from './common/locator';
import { CODE_EDITOR_FORM, CODE_OUTPUT, CODE_RUN_BTN } from './common/element-ids';
import { signIn } from './common/auth';

test('index page shows code editor', async ({ page }) => {
	await page.goto('/');

	await expect(findCodeEditor(page)).toBeVisible();
});

test('unauthenticated user can enter code', async ({ page }) => {
	const codeSnippet = 'let x = 2;';

	await page.goto('/');
	const editor = findCodeEditor(page);
	await editor.click();
	await editor.pressSequentially(codeSnippet);

	await expect(editor).toHaveText(codeSnippet);
});

test('authenticated user can enter code', async ({ page }) => {
	const codeSnippet = 'let x = 2';

	await page.goto('/');
	await signIn(page);

	const editor = findCodeEditor(page);
	await editor.click();
	await editor.pressSequentially(codeSnippet);

	await expect(editor).toHaveText(codeSnippet);
});

test('authenticated user can run code', async ({ page }) => {
	const codeSnippet = 'let two = 2; two + two;';
	const expectedOutput = '4';

	await page.goto('/');
	await signIn(page);

	await findCodeEditor(page).pressSequentially(codeSnippet);
	const runBtn = findElement(page, CODE_RUN_BTN);
	await expect(runBtn).toBeEnabled();
	await runBtn.click();

	await expect(findElement(page, CODE_OUTPUT)).toHaveText(expectedOutput);
});

test('unauthenticated user cannot run code', async ({ page }) => {
	const codeSnippet = 'let two = 2; two + two;';

	await page.goto('/');
	await findCodeEditor(page).fill(codeSnippet);

	await expect(findElement(page, CODE_RUN_BTN)).toBeDisabled();
});

test('authenticated user cannot submit empty code', async ({ page }) => {
	await page.goto('/');
	await signIn(page);

	await expect(findElement(page, CODE_RUN_BTN)).toBeDisabled();
});

function findCodeEditor(page: Page): Locator {
	return page.locator(elementSelector(CODE_EDITOR_FORM) + ' > pre');
}
