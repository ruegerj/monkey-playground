import { Locator, Page } from '@playwright/test';

export function findElement(page: Page, testId: string): Locator {
	return page.locator(elementSelector(testId));
}

export function elementSelector(testId: string): string {
	return `[data-test="${testId}"]`;
}
