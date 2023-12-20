import { test as setup, expect } from '@playwright/test';

const baseURL = 'http://localhost:3000';
const customerAccount = 'customer+clerk_test@test.com';
const customerPassword = 'Customertest';
const merchantAccount = 'merchant+clerk_test@test.com';
const merchantPassword = 'Merchanttest';

const customerFile = 'playwright/.auth/customer.json';
setup('authenticate as customer', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto(baseURL);
  console.log(page.url());
  await page.locator('span:text("Get Started")').click();
  await page.locator('#identifier-field').fill(customerAccount);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000);
  console.log(page.url());
  await page.locator('#password-field').fill(customerPassword);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(8000);
  // Wait until the page receives the cookies.
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  console.log(page.url());
  await expect(page.locator('#logo')).toBeVisible();

  // End of authentication steps.
  await page.context().storageState({ path: customerFile });
});

const merchantFile = 'playwright/.auth/merchant.json';
setup('authenticate as merchant', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto(baseURL);
  console.log(page.url());
  await page.locator('span:text("Get Started")').click();
  await page.locator('#identifier-field').fill(merchantAccount);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000);
  console.log(page.url());
  await page.locator('#password-field').fill(merchantPassword);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(8000);
  // Wait until the page receives the cookies.
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  console.log(page.url());
  await expect(page.locator('h2:text("Menu")')).toBeVisible();

  // End of authentication steps.
  await page.context().storageState({ path: merchantFile });
});
