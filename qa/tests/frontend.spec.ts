import { test, expect } from '@playwright/test';

const baseURL = 'http://127.0.0.1:3000';
const customerAccount = 'foodytry1@gmail.com';
const customerPassword = 'Foodytryaccount1';
const merchantAccount = 'foodytry2@gmail.com';
const merchantPassword = 'Foodytryaccount2';

test.describe('Customer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    await page.getByText('Continue with Google').click();
    await page.waitForTimeout(2000);
    await page.locator('input[type="email"]').fill(customerAccount);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
    await page.locator('input[type="password"]').fill(customerPassword);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
  });

  test.describe('Components', () => {
    test('Menu bar', async ({ page }) => {
      await expect(page.locator('#menu-button')).toBeVisible();
    });
    test('Locator', async ({ page }) => {
      await expect(page.locator('#locator')).toBeVisible();
    });
    test('Nav bar', async ({ page }) => {
      await page.locator('#menu-button').click();
      await page.waitForTimeout(1000);
      await expect(page.locator('#nav-bar')).toBeVisible();
    });
  });

  test.describe('Restaurant Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('#menu-button').click();
      await page.waitForTimeout(1000);
      await page.getByText('Restauarant').click();
      await page.reload();
    });

    test('Restaurant page', async ({ page }) => {
      await expect(
        page.locator('h1:text("Favorite Restaurant")')
      ).toBeVisible();
      await expect(page.locator('h1:text("Top Restaurant")')).toBeVisible();
      await expect(page.locator('h1:text("Category")')).toBeVisible();
    });

    test('View all favorite restaurant', async ({ page }) => {
      await page.locator('[href="/customer/allFavorite"]').click();
      expect(page.url()).toContain('/customer/allFavorite');
    });

    test('View all restaurant', async ({ page }) => {
      await page.locator('[href="/customer/all"]').first().click();
      expect(page.url()).toContain('/customer/all');
    });

    test('View american restaurant', async ({ page }) => {
      await page.getByText('美式').click();
      expect(
        page.locator('button:text("美式")').getAttribute('aria-selected')
      ).toBe('true');
    });
  });
  test.describe('Order Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('#menu-button').click();
      await page.waitForTimeout(1000);
      await page.getByText('Order').click();
      await page.reload();
    });

    test('Order page', async ({ page }) => {
      await expect(page.getByText('Orders')).toBeVisible();
    });
  });

  test.describe('Payments Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('#menu-button').click();
      await page.waitForTimeout(1000);
      await page.getByText('Monthly Payment').click();
      await page.reload();
    });

    test('Payment page', async ({ page }) => {
      await expect(page.getByText('Total Cost')).toBeVisible();
      await expect(page.getByText('Orders')).toBeVisible();
      await expect(page.getByText('Resraurants')).toBeVisible();
    });

    test('Payment table', async ({ page }) => {
      await expect(page.locator('table')).toBeVisible();
    });
  });
});

test.describe('Merchant', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    await page.getByText('Continue with Google').click();
    await page.waitForTimeout(2000);
    await page.locator('input[type="email"]').fill(merchantAccount);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
    await page.locator('input[type="password"]').fill(merchantPassword);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
  });

  test.describe('Components', () => {
    test('Edit Store', async ({ page }) => {
      await page.locator('[aria-label="Edit store"]').click();
      await page.waitForTimeout(1000);
      await expect(
        page.getByText('Edit your store details here')
      ).toBeVisible();
    });

    test('Payment table', async ({ page }) => {
      await expect(page.locator('table')).toBeVisible();
    });
  });

  test.describe('Menu Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('#navbar').getByText('Menu').click();
      await page.reload();
      await page.waitForTimeout(2000);
    });

    test('Menu page', async ({ page }) => {
      await expect(page.getByRole('tablist')).toBeVisible();
    });

    test('Add menu type', async ({ page }) => {
      await page.locator('[aria-label="Add menu type"]').click();
      await page.waitForTimeout(1000);
      await expect(
        page.getByText('Edit your store details here')
      ).toBeVisible();
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
      await page.reload();
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
      await page.reload();
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
