# Playwright SauceDemo Automation Framework

[![Playwright Tests](https://github.com/Sanvia-Ratry/playwright-saucedemo-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/Sanvia-Ratry/playwright-saucedemo-automation/actions/workflows/playwright.yml)

A UI test automation framework for the [SauceDemo](https://www.saucedemo.com/) e-commerce demo site, built with **JavaScript, Playwright Test, the Page Object Model (POM) and custom fixtures**. It runs in GitHub Actions on every push and pull request.

**Scale:** 23 tests × 3 browsers (Chromium, Firefox, WebKit) = 69 executions per run.

## 🛠️ Technologies Used

- **JavaScript (ES Modules)**, **Node.js and npm**
- **Playwright Test**
- **Page Object Model** with **custom fixtures**
- **Data-driven tests** (test data kept separate from test logic)
- **HTML test reports** and traces on retry
- **GitHub Actions** for CI

## 📂 Project Structure

```text
playwright-saucedemo-automation/
├── .github/workflows/playwright.yml   CI workflow
├── fixtures/test.js                   Custom fixtures (login, inventory, cart, checkout)
├── pages/
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── test-data/users.js                 Users, invalid logins, checkout field cases
├── tests/
│   ├── login.spec.js                  8 tests
│   ├── inventory.spec.js              11 tests
│   └── checkout.spec.js               4 tests
├── playwright.config.js
└── package.json
```

## ✅ Test Coverage

**Login and session (8)**

- Login page loads; standard user logs in successfully
- Data-driven login failures: wrong password, empty username, empty password, locked-out user
- Logout; `/inventory.html` is not accessible without logging in

**Inventory and cart (11)**

- Inventory page displays products
- Sorting: name A–Z, name Z–A, price low–high, price high–low
- Add to cart, remove from cart, cart shows the added product
- Cart to checkout, submit checkout information, complete an order

**Checkout validation (4)**

- Missing first name, last name or postal code shows the correct error
- Order total equals item total plus tax

## 🏗️ Framework Design

- **Page Object Model:** `pages/` holds one class per page, with locators and user actions, so tests read like user stories and a selector change is fixed in one place.
- **Custom fixtures:** `fixtures/test.js` provides `loginPage`, `inventoryPage` (already logged in as the standard user), `cartPage` and `checkoutPage`.
- **Test data:** `test-data/users.js` holds credentials plus the arrays that drive the login and checkout tests.
- **Configuration:** `playwright.config.js` sets the base URL, three browser projects, 2 retries on CI, an HTML report and a trace on first retry.

## ⚙️ Getting Started

```bash
gh repo clone Sanvia-Ratry/playwright-saucedemo-automation
cd playwright-saucedemo-automation
npm ci
npx playwright install --with-deps
```

## ▶️ Running the Tests

```bash
npm test                # all tests, all browsers
npm run test:chromium   # Chromium only
npm run test:headed     # watch the browser
npm run test:report     # open the HTML report
```

## 🔄 Continuous Integration

Tests run automatically in GitHub Actions on every push and pull request to `main` or `master`. Failed tests are retried twice, a trace is captured on retry, and the HTML report is uploaded as a build artifact (kept for 30 days). See the **Actions** tab for run history.

## 🧪 Notes on Test Execution

The tests run against the public SauceDemo site, so results can depend on its availability and on the browser environment.

## 🗺️ Roadmap

- [ ] Tag smoke and regression suites
- [ ] Add mobile viewport projects
- [ ] Add visual regression checks

---

**Tools:** JavaScript · Playwright · Node.js · GitHub Actions
