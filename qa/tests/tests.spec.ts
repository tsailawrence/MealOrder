import { test, expect } from "@playwright/test";

const baseURL = "http://127.0.0.1:3001";
const customerToken = "dev:id:12";
const merchantToken = "dev:id:19";

test.describe("Customer", () => {
  test("Get user info", async ({ request }) => {
    const response = await request.get(`${baseURL}/my/info`, {
      params: { accessToken: customerToken },
    });
    expect(response.status()).toBe(200);
  });
  test("Get restaurant", async ({ request }) => {
    const response = await request.get(`${baseURL}/store/restaurant/1`, {
      params: { accessToken: customerToken },
    });
    expect(response.status()).toBe(200);
  });
  test("Get top restaurant", async ({ request }) => {
    const response = await request.get(`${baseURL}/store/topRestaurant`, {
      params: { accessToken: customerToken },
    });
    expect(response.status()).toBe(200);
  });
  test("Get my favorite Restaurant", async ({ request }) => {
    const response = await request.get(`${baseURL}/my/favoriteRestaurant`, {
      params: { accessToken: customerToken },
    });
    expect(response.status()).toBe(200);
  });
  test("Get my order", async ({ request }) => {
    const response = await request.get(`${baseURL}/my/order/get`, {
      params: { accessToken: customerToken },
    });
    expect(response.status()).toBe(200);
  });
});

test.describe("Merchant", () => {
  test("Get my store products", async ({ request }) => {
    const response = await request.get(`${baseURL}/my/store/1/products`, {
      params: { accessToken: merchantToken },
    });
    expect(response.status()).toBe(200);
  });
  test("Get my store orders", async ({ request }) => {
    const response = await request.get(`${baseURL}/my/store/orders`, {
      params: { accessToken: merchantToken },
    });
    expect(response.status()).toBe(200);
  });
  test("Get my store monthly orders", async ({ request }) => {
    const response = await request.get(
      `${baseURL}/my/store/1/order/getMonthly/11`,
      {
        params: { accessToken: merchantToken },
      }
    );
    expect(response.status()).toBe(200);
  });
  test("Get my store customer monthly billing", async ({ request }) => {
    const response = await request.get(
      `${baseURL}/my/store/1/order/customerMonthlyBilling/11`,
      {
        params: { accessToken: merchantToken },
      }
    );
    expect(response.status()).toBe(200);
  });
});
