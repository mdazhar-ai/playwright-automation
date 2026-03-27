const { test, expect } = require('@playwright/test');
const { AuthApi } = require('../../api/AuthApi');

test('Login API Test', async ({ request }) => {

  const authApi = new AuthApi(request);

  const loginPayload = {
    email: "dk@amnetdigital.com",
    password: "m3KtDGTQggE6dM00sGMMHA==",
    rememberMe: false
  };

  const response = await authApi.login(loginPayload);

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  console.log('👉 FULL RESPONSE:', JSON.stringify(responseBody, null, 2));

  expect(responseBody).toBeTruthy();

  if (responseBody.success !== undefined) {
    expect(responseBody.success).toBe(true);
  }
});