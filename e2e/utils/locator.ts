import { Locator, Page } from '@playwright/test';

export function findElement(page: Page, testId: string): Locator {
	return page.locator(`[data-test="${testId}"]`);
}
