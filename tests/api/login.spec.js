const { test, expect } = require('@playwright/test');
const { AuthApi } = require('../../api/AuthApi');

test.describe('Auth API Tests', () => {

  // ✅ Positive Test
  test('Valid Login', async ({ request }) => {
    const authApi = new AuthApi(request);

    const response = await authApi.login({
      email: "dk@amnetdigital.com",
      password: "m3KtDGTQggE6dM00sGMMHA==",
      rememberMe: false
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log("Valid Login Response:", body);

    // ✅ Validate structure
    expect(body).toMatchObject({
      status: 'success',
      message: 'Login Successful',
      data: {
        access: expect.any(String),
        refresh: expect.any(String),
        expiresIn: expect.any(String)
      }
    });

    // ✅ Extra validations
    expect(body.data.access.length).toBeGreaterThan(10);
    expect(body.data.refresh.length).toBeGreaterThan(10);
  });

  // ❌ Negative - Invalid Password
  test('Invalid Password', async ({ request }) => {
    const authApi = new AuthApi(request);

    const response = await authApi.login({
      email: "dk@amnetdigital.com",
      password: "1234566",
      rememberMe: false
    });

    expect([400, 401]).toContain(response.status());

    const body = await response.json();
    console.log("Invalid Password Response:", body);

    expect(body).toBeTruthy();
    expect(body.message).toBeTruthy();
  });

  // ❌ Negative - Invalid Email
  test('Invalid Email Format', async ({ request }) => {
    const authApi = new AuthApi(request);

    const response = await authApi.login({
      email: "1234@gmail.com",
      password: "Icon@1234",
      rememberMe: false
    });

    expect([400, 422]).toContain(response.status());
  });

  // ❌ Negative - Missing Fields
  test('Missing Payload Fields', async ({ request }) => {
    const authApi = new AuthApi(request);

    const response = await authApi.login({
      email: "",
      password: ""
    });

    expect([400, 422]).toContain(response.status());
  });

  // ⚠️ Edge Case - Empty Payload
  test('Empty Payload', async ({ request }) => {
    const authApi = new AuthApi(request);

    const response = await authApi.login({});

    expect([400, 422]).toContain(response.status());
  });

  // ⚡ Performance Test
  test('Response Time Check', async ({ request }) => {
    const authApi = new AuthApi(request);

    const start = Date.now();

    const response = await authApi.login({
      email: "dk@amnetdigital.com",
      password: "m3KtDGTQggE6dM00sGMMHA==",
      rememberMe: false
    });

    const duration = Date.now() - start;

    console.log("Response Time:", duration, "ms");

    expect(duration).toBeLessThan(2000);
    expect(response.status()).toBe(200);
  });

  // Security - SQL Injection
  test('SQL Injection Attempt', async ({ request }) => {
    const authApi = new AuthApi(request);

    const response = await authApi.login({
      email: "' OR 1=1 --",
      password: "389303))@*#*)#",
      rememberMe: false
    });

    expect([400, 401, 403]).toContain(response.status());
  });

  // 🔐 Security - XSS Attack
  test('XSS Injection Attempt', async ({ request }) => {
    const authApi = new AuthApi(request);

    const response = await authApi.login({
      email: "<script>alert(1)</script>",
      password: "test",
      rememberMe: false
    });

    expect([400, 401,403, 422]).toContain(response.status());
  });

  // 🔐 Security - Large Payload
  test('Large Payload Attack', async ({ request }) => {
    const authApi = new AuthApi(request);

    const largeString = 'a'.repeat(10000);

    const response = await authApi.login({
      email: largeString,
      password: largeString,
      rememberMe: false
    });

    expect([400, 413, 422]).toContain(response.status());
  });

});