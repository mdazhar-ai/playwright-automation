# 🧪 Auth API Automation – Playwright

This project contains automated API tests for the **Login (Auth) API** using Playwright.
The suite is designed to validate functionality, robustness, performance, and security of the authentication service.

---

## 🚀 Tech Stack

* **Framework:** Playwright Test
* **Language:** JavaScript (Node.js)
* **Architecture:** API abstraction using `AuthApi` class

---

## 📁 Project Structure

```
tests/
 └── api/
      └── login.spec.js   # Test cases

api/
 └── AuthApi.js           # API methods (login, etc.)
```

---

## ▶️ How to Run Tests

```bash
npm install
npx playwright test tests/api
```

Run a specific file:

```bash
npx playwright test tests/api/login.spec.js
```

---

## 📌 Test Coverage Overview

The test suite is divided into **five major categories**:

---

## 1. ✅ Positive Testing

### ✔️ Valid Login

**Objective:** Verify successful login with valid credentials.

**Validations:**

* Status code = `200`
* Response structure:

  * `status: success`
  * `message: Login Successful`
  * `data.access` (JWT token)
  * `data.refresh` (refresh token)
* Token length and type validation

---

## 2. ❌ Negative Testing

### ✔️ Invalid Password

* Verifies login failure with incorrect password
* Expected status: `400` or `401`
* Ensures error message is returned

---

### ✔️ Invalid Email Format

* Tests invalid email input
* Expected status: `400` or `422`

---

### ✔️ Missing Fields

* Tests empty email/password
* Expected status: `400` or `422`

---

## 3. ⚠️ Edge Case Testing

### ✔️ Empty Payload

* Sends completely empty request `{}`
* Validates API handling of missing request body
* Expected status: `400` or `422`

---

## 4. ⚡ Performance Testing

### ✔️ Response Time Check

* Measures API response time
* Threshold: **< 2000 ms**
* Ensures system meets performance expectations

---

## 5. 🔐 Security Testing

### ✔️ SQL Injection Test

* Input: `' OR 1=1 --`
* Ensures API rejects malicious queries
* Expected status: `400`, `401`, or `403`

---

### ✔️ XSS Injection Test

* Input: `<script>alert(1)</script>`
* Validates protection against script injection
* Expected status: `400`, `401`, `403`, or `422`

---

### ✔️ Large Payload Attack

* Sends very large input string (10,000 chars)
* Tests API resilience against payload abuse
* Expected status: `400`, `413`, or `422`

---

## 🧠 Key Testing Concepts Used

* API Automation using Playwright
* Positive & Negative Testing
* Edge Case Validation
* Performance Testing
* Security Testing (basic OWASP scenarios)
* Response Structure Validation (`toMatchObject`)

---

## 💡 Best Practices Followed

* ✔ Assertions based on **actual API response** (no assumptions)
* ✔ Reusable API layer (`AuthApi`)
* ✔ Clean test grouping using `test.describe`
* ✔ Flexible status code validation
* ✔ Debug logging for failure analysis

---

## 🔮 Possible Enhancements

* JSON Schema Validation (AJV)
* CI/CD Integration (GitHub Actions / Jenkins)
* Environment-based configuration (dev, QA, prod)
* Test data management
* Advanced security testing

---

## 🎯 Interview Summary (2–3 lines)

This test suite validates the login API using Playwright by covering positive, negative, edge, performance, and security scenarios.
It ensures response correctness, system robustness, and basic security protections by aligning assertions with the actual API contract.

---

## 👨‍💻 Author

QA Automation Engineer – API Testing
