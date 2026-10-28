import { test, expect } from "../fixtures/test.js";
import { users } from "../test-data/users.js";

test("login page loads successfully", async ({ loginPage }) => {
  await loginPage.goto();

  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();
});

test("standard user can log in successfully", async ({ page, loginPage }) => {
  await loginPage.goto();
  await loginPage.login(users.validUser.username, users.validUser.password);
  await expect(page).toHaveURL(/inventory.html/);
});

test("invalid password displays an error", async ({ page, loginPage }) => {
  await loginPage.goto();
  await loginPage.login(users.validUser.username, users.invalidPasswordUser.password);
  await expect(page.locator('[data-test="error"]')).toContainText(
    "Username and password do not match",
  );
});
