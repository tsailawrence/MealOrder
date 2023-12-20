import { test as setup, expect } from '@playwright/test';

const baseURL = 'http://localhost:3000';
const customerAccount = 'foodytry1@gmail.com';
const customerPassword = 'Foodytryaccount1';
const merchantAccount = 'foodytry2@gmail.com';
const merchantPassword = 'Foodytryaccount2';

const customerFile = 'playwright/.auth/customer.json';
setup('authenticate as customer', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto(baseURL);
  await page.getByText('Continue with Google').click();
  await page.waitForTimeout(2000);
  await page.locator('input[type="email"]').fill(customerAccount);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000);
  await page.locator('input[type="password"]').first().fill(customerPassword);
  await page.keyboard.press('Enter');
  await page.waitForLoadState('networkidle');
  // Wait until the page receives the cookies.
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.locator('#logo')).toBeVisible();

  // End of authentication steps.
  await page.context().storageState({ path: customerFile });
});

const merchantFile = 'playwright/.auth/merchant.json';
setup('authenticate as merchant', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto(baseURL);
  await page.getByText('Continue with Google').click();
  await page.waitForTimeout(2000);
  await page.locator('input[type="email"]').fill(merchantAccount);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000);
  await page.locator('input[type="password"]').first().fill(merchantPassword);
  await page.keyboard.press('Enter');
  await page.waitForLoadState('networkidle');
  // Wait until the page receives the cookies.
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.locator('h2:text("Menu")')).toBeVisible();

  // End of authentication steps.
  await page.context().storageState({ path: merchantFile });
});
