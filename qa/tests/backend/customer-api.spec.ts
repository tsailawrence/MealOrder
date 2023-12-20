import { test, expect } from '@playwright/test';

const baseURL = 'http://127.0.0.1:3001';
const customerToken = 'dev:id:12';

test.describe('Customer', () => {
  test('Get user info', async ({ request }) => {
    const response = await request.get(`${baseURL}/my/info`, {
      params: { accessToken: customerToken },
    });
    expect(response.status()).toBe(200);
  });

  test('Get restaurant', async ({ request }) => {
    const response = await request.get(`${baseURL}/store/restaurant/1`, {
      params: { accessToken: customerToken },
    });
    expect(response.status()).toBe(200);
  });

  test('Get top restaurant', async ({ request }) => {
    const response = await request.get(`${baseURL}/store/topRestaurant`, {
      params: { accessToken: customerToken },
    });
    expect(response.status()).toBe(200);
  });

  test('Get my favorite Restaurant', async ({ request }) => {
    const response = await request.get(`${baseURL}/my/favoriteRestaurant`, {
      params: { accessToken: customerToken },
    });
    expect(response.status()).toBe(200);
  });

  test('Get my order', async ({ request }) => {
    const response = await request.get(`${baseURL}/my/order/get`, {
      params: { accessToken: customerToken },
    });
    expect(response.status()).toBe(200);
  });
});
