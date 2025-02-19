import { expect, test } from '@playwright/test';
import { findElement } from './common/locator';
import {
	GITHUB_SIGN_IN_BTN,
	USER_AVATAR,
	USER_AVATAR_IMG,
	USER_MENU,
	USER_MENU_SIGN_OUT_BTN,
	USER_MENU_USERNAME
} from './common/element-ids';
import { signIn } from './common/auth';

test('index page shows github sign-in btn', async ({ page }) => {
	await page.goto('/');

	await expect(findElement(page, GITHUB_SIGN_IN_BTN)).toBeVisible();
});

/**
 * Note: this test does NOT cover the oauth flow of github as it would break the application scope.
 *       Rather it checks, wether the information and controls of an authenticated user are properly available.
 */
test('user can sign in with github', async ({ page }) => {
	const expectedAvatarUrl = 'https://avatars.githubusercontent.com/u/1111111';

	await page.goto('/');
	await signIn(page);

	await expect(findElement(page, USER_AVATAR)).toBeVisible();
	await expect(findElement(page, USER_AVATAR_IMG)).toHaveAttribute('src', expectedAvatarUrl);
});

test('user can show user menu', async ({ page }) => {
	const expectedUsername = 'acme';

	await page.goto('/');
	await signIn(page);
	await findElement(page, USER_AVATAR).click();

	await expect(findElement(page, USER_MENU)).toBeVisible();
	await expect(findElement(page, USER_MENU_USERNAME)).toHaveText(expectedUsername);
});

test('user can sign out', async ({ page }) => {
	await page.goto('/');
	await signIn(page);
	await findElement(page, USER_AVATAR).click();

	const signOutBtn = findElement(page, USER_MENU_SIGN_OUT_BTN);
	await expect(signOutBtn).toBeEnabled();
	await signOutBtn.click();

	await expect(findElement(page, GITHUB_SIGN_IN_BTN)).toBeVisible();
});
