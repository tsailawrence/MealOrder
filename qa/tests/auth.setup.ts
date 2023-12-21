import { test as setup } from '@playwright/test';

const baseURL = 'http://0.0.0.0:3000';
const customerAccount = 'customer+clerk_test@test.com';
const customerPassword = 'Customertest';
const merchantAccount = 'merchant+clerk_test@test.com';
const merchantPassword = 'Merchanttest';

const customerFile = 'playwright/.auth/customer.json';
setup('authenticate as customer', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  console.log('customer test');
  await page.goto(baseURL);
  console.log(page.url());
  await page.locator('button:text("Get Started")').click();
  await page.waitForTimeout(1000);
  // await page.screenshot({ path: path.join(screenshotsDir, 'screenshot1.png') });
  console.log(page.url());
  await page.locator('#identifier-field').fill(customerAccount);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1000);
  console.log(page.url());
  await page.locator('#password-field').fill(customerPassword);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(3000);
  // Wait until the page receives the cookies.
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  console.log(page.url());
  // await expect(page.locator('#logo')).toBeVisible();
  await page.waitForLoadState('networkidle');
  await page.pause();

  // End of authentication steps.
  await page.context().storageState({ path: customerFile });
});

const merchantFile = 'playwright/.auth/merchant.json';
setup('authenticate as merchant', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  console.log('merchant test');
  await page.goto(baseURL);
  console.log(page.url());
  await page.locator('button:text("Get Started")').click();
  await page.waitForTimeout(1000);
  console.log(page.url());
  // await page.screenshot({ path: path.join(screenshotsDir, 'screenshot2.png') });
  await page.locator('#identifier-field').fill(merchantAccount);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1000);
  console.log(page.url());
  await page.locator('#password-field').fill(merchantPassword);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(3000);
  // Wait until the page receives the cookies.
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  console.log(page.url());
  // await expect(page.locator('h2:text("Menu")')).toBeVisible();
  await page.waitForLoadState('networkidle');

  // End of authentication steps.
  await page.context().storageState({ path: merchantFile });
});
