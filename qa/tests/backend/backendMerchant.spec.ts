import { test, expect } from '@playwright/test';

const baseURL = 'http://127.0.0.1:3001';
const merchantToken = 'dev:id:19';

test.describe('Merchant', () => {
  test('Get my store products', async ({ request }) => {
    const response = await request.get(`${baseURL}/my/store/1/products`, {
      params: { accessToken: merchantToken },
    });
    expect(response.status()).toBe(200);
  });
  test('Get my store orders', async ({ request }) => {
    const response = await request.get(`${baseURL}/my/store/orders`, {
      params: { accessToken: merchantToken },
    });
    expect(response.status()).toBe(200);
  });
  test('Get my store monthly orders', async ({ request }) => {
    const response = await request.get(
      `${baseURL}/my/store/1/order/getMonthly/11`,
      {
        params: { accessToken: merchantToken },
      }
    );
    expect(response.status()).toBe(200);
  });
  test('Get my store customer monthly billing', async ({ request }) => {
    const response = await request.get(
      `${baseURL}/my/store/1/order/customerMonthlyBilling/11`,
      {
        params: { accessToken: merchantToken },
      }
    );
    expect(response.status()).toBe(200);
  });
});
