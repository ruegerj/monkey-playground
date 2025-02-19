import { Page } from '@playwright/test';
import { GITHUB_SIGN_IN_BTN } from './element-ids';
import { findElement } from './locator';

export async function signIn(page: Page): Promise<void> {
	await findElement(page, GITHUB_SIGN_IN_BTN).click();
	await page.waitForLoadState('networkidle');
}
