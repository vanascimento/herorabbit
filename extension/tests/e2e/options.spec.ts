import { test, expect } from './fixtures';
import { ROOT_CONTAINER_ID } from '../../src/lib/constants';

test('popup page', async ({ page, extensionId }) => {
  await page.goto(`chrome-extension://${extensionId}/options.html`);

  await expect(page.locator(`#${ROOT_CONTAINER_ID}`)).toBeDefined();

  const imageBlocks = page.locator('.ext-safe-image');
  for (const imageBlock of await imageBlocks.all()) {
    await expect(imageBlock).toBeVisible();
  }
});
