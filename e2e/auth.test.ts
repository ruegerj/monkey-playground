import { expect, Page, test } from '@playwright/test';
import { findElement } from './utils/locator';

const GITHUB_SIGN_IN_BTN = 'gh-sign-in-btn';
const USER_AVATAR = 'user-avatar';
const USER_AVATAR_IMG = 'user-avatar-img';
const USER_MENU = 'user-menu';
const USER_MENU_USERNAME = 'user-menu-username';
const USER_MENU_SIGN_OUT_BTN = 'user-menu-sign-out-btn';

test('index page has github sign-in btn', async ({ page }) => {
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

function signIn(page: Page): Promise<void> {
	return findElement(page, GITHUB_SIGN_IN_BTN).click();
}
