# Playwright Saucedemo Automation Framework
[![Playwright Tests](https://github.com/Sanvia-Ratry/playwright-saucedemo-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/Sanvia-Ratry/playwright-saucedemo-automation/actions/workflows/playwright.yml)

A UI and API test automation framework built with JavaScript, Playwright Test, and the Page Object Model (POM). This project demonstrates maintainable test architecture, reusable fixtures, and cross-browser automated testing for an e-commerce application.

## 🚀 Project Overview

This project automates key user journeys on [SauceDemo](https://www.saucedemo.com/) and includes an API test using JSONPlaceholder.

The goal is to demonstrate practical QA automation skills, including functional testing, test organization, reusable page objects, assertions, and continuous integration.

**Scale:** 11 UI tests + 1 API test, run across Chromium, Firefox and WebKit (36 executions per run).

## 🛠️ Technologies Used

- **JavaScript (ES Modules)**
- **Playwright Test**
- **Node.js and npm**
- **Page Object Model (POM)**
- **Custom Playwright Fixtures**
- **API Testing**
- **HTML Test Reports**
- **Git and GitHub**
- **GitHub Actions** for CI

## 📂 Project Structure

```text
playwright-saucedemo-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── fixtures/
│   └── test.js
├── pages/
│   └── LoginPage.js
├── test-data/
│   └── users.js
├── tests/
│   ├── api.spec.js
│   ├── inventory.spec.js
│   └── login.spec.js
├── .gitignore
├── package.json
├── package-lock.json
└── playwright.config.js
```

## ✅ Test Coverage

### UI Testing — SauceDemo

- Verify that the login page loads correctly.
- Verify successful login with valid credentials.
- Verify error handling for an invalid password.
- Verify that the inventory page is displayed.
- Verify product sorting by price, low to high.
- Verify adding products to the cart.
- Verify removing products from the cart.
- Verify cart contents.
- Verify navigation to checkout.
- Verify checkout information submission.
- Verify successful order completion.

### API Testing — JSONPlaceholder

- Send an HTTP GET request to retrieve users.
- Verify the HTTP status code.
- Verify that the response is a non-empty array.
- Validate required user properties.
- Verify the data types of key response fields.

## 🏗️ Framework Design

### Page Object Model (POM)

The `pages/` directory contains page classes that encapsulate page locators and user interactions. This separates page-specific implementation from test logic and makes the framework easier to maintain.

### Custom Fixtures

The `fixtures/test.js` file provides a reusable `loginPage` fixture, allowing tests to access the login page object without repeatedly creating it.

### Test Data Management

The `test-data/users.js` file centralizes login test data, making test cases easier to read and update.

### Playwright Configuration

The `playwright.config.js` file configures the test directory, browser projects, base URL, HTML reporting, and trace collection on the first retry.

## ⚙️ Getting Started

### Prerequisites

- Node.js installed
- npm installed
- Git installed

### 1. Clone the Repository

```bash
gh repo clone Sanvia-Ratry/playwright-saucedemo-automation
```

### 2. Install Dependencies

```bash
npm ci
```

### 3. Install Playwright Browsers

```bash
npx playwright install --with-deps
```

### 4. Run All Tests

```bash
npm test
```

### 5. Run Tests in Chromium

```bash
npm run test:chromium
```

### 6. Run Tests in Headed Mode

```bash
npm run test:headed
```

### 7. View the HTML Test Report

```bash
npm run test:report
```

The report can be opened after a test run has generated it.

## 🔄 Continuous Integration

Tests run automatically in GitHub Actions on every push and pull request to `main` or `master`.
Failed tests are retried twice, a trace is captured on retry, and the HTML report is uploaded as a
build artifact (kept for 30 days). See the **Actions** tab for run history.

## 🧪 Test Execution

The UI tests use the SauceDemo demo application. The API test uses the public JSONPlaceholder service.

Test results can depend on the availability of these external services and the configured browser environment.

## 🗺️ Roadmap

- [ ] Page objects for inventory, cart and checkout
- [ ] Data-driven negative login tests (empty fields, locked-out user)
- [ ] Checkout field validation and order total tests
- [ ] Documented defects from `problem_user` and `error_user`
- [ ] CI workflow configuration

## 👨‍💻 About This Project

This project is part of my QA Automation portfolio, demonstrating how to structure, execute, and maintain automated tests for web applications and APIs.

---

**Tools:** JavaScript · Playwright · Node.js · GitHub Actions
