import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:3000';
test.use({ storageState: 'playwright/.auth/merchant.json' });

test.describe('Merchant', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    await page.locator('span:text("Get Started")').click();
    await page.waitForLoadState('networkidle');
  });

  test.describe('Components', () => {
    test('Edit Store', async ({ page }) => {
      await page.locator('[aria-label="Edit store"]').click();
      await page.waitForTimeout(1000);
      await expect(
        page.getByText('Edit your store details here')
      ).toBeVisible();
    });
  });

  test.describe('Menu Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('#navbar').getByText('Menu').click();
      await page.waitForTimeout(2000);
    });

    test('Menu page', async ({ page }) => {
      await expect(page.getByRole('tablist')).toBeVisible();
    });

    test('Add menu type', async ({ page }) => {
      await page.locator('[aria-label="Add menu type"]').click();
      await page.waitForTimeout(1000);
      await expect(page.getByText('Add Menu Type')).toBeVisible();
    });

    test('Add item', async ({ page }) => {
      await page.locator('#add-product').click();
      await page.waitForTimeout(1000);
      await expect(page.getByText('Add Item')).toBeVisible();
    });

    test('Edit menu hour', async ({ page }) => {
      await page.getByText('Edit Menu Hour').click();
      await page.waitForTimeout(1000);
      await expect(
        page.getByText('Select the time you want to open your store')
      ).toBeVisible();
    });
  });

  test.describe('Order Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('#navbar').getByText('Orders').click();
      await page.waitForTimeout(2000);
    });

    test('Order page', async ({ page }) => {
      await expect(page.getByText('Today')).toBeVisible();
      await expect(page.getByText('Upcoming')).toBeVisible();
      await expect(page.getByText('All Orders')).toBeVisible();
    });

    test('All orders', async ({ page }) => {
      await page.getByText('All Orders').click();
      await page.waitForTimeout(1000);
      await expect(page.locator('#all-orders-table')).toBeVisible();
    });
  });

  test.describe('Payment Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('#navbar').getByText('Payments').click();
      await page.waitForTimeout(2000);
    });

    test('Payment page', async ({ page }) => {
      await expect(page.getByText('Total Revenue')).toBeVisible();
      await expect(page.getByText('Customers')).toBeVisible();
    });

    test('Payment table', async ({ page }) => {
      await expect(page.locator('table')).toBeVisible();
    });
  });
});
