import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:3000';
const customerAccount = 'foodytry1@gmail.com';
const customerPassword = 'Foodytryaccount1';

test.describe('Customer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    await page.getByText('Continue with Google').click();
    await page.waitForTimeout(2000);
    await page.locator('input[type="email"]').fill(customerAccount);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
    await page.locator('input[type="password"]').first().fill(customerPassword);
    await page.keyboard.press('Enter');
    await page.waitForLoadState('networkidle');
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
      await page.waitForTimeout(2000);
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
      await page.waitForTimeout(2000);
      expect(
        await page.locator('button:text("美式")').getAttribute('aria-selected')
      ).toBe('true');
    });
  });

  test.describe('Order Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('#menu-button').click();
      await page.waitForTimeout(1000);
      await page.getByText('Order').click();
      await page.waitForTimeout(2000);
    });

    test('Order page', async ({ page }) => {
      expect(await page.locator('h1').textContent()).toBe('Orders');
    });
  });

  test.describe('Payments Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('#menu-button').click();
      await page.waitForTimeout(1000);
      await page.getByText('Monthly Payment').click();
      await page.waitForTimeout(2000);
    });

    test('Payment page', async ({ page }) => {
      await expect(page.locator('h2:text("Total Cost")')).toBeVisible();
      await expect(page.getByText('Orders')).toBeVisible();
      await expect(page.locator('h2:text("Restaurants")')).toBeVisible();
    });

    test('Payment table', async ({ page }) => {
      await expect(page.locator('table')).toBeVisible();
    });
  });
});
