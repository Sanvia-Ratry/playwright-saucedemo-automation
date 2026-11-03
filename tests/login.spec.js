import { test, expect } from "../fixtures/test.js";
import { users, invalidLogins } from "../test-data/users.js";

test.describe("Login", () => {
  test("login page loads successfully", async ({ loginPage }) => {
    await loginPage.goto();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test("standard user can log in successfully", async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await expect(page).toHaveURL(/inventory\.html/);
  });

  for (const c of invalidLogins) {
    test(`login fails: ${c.name}`, async ({ page, loginPage }) => {
      await loginPage.goto();
      await loginPage.login(c.user, c.pass);
      await expect(page.locator('[data-test="error"]')).toContainText(c.error);
      await expect(page).not.toHaveURL(/inventory\.html/);
    });
  }
});

test.describe("Session", () => {
  test("user can log out", async ({ page, inventoryPage }) => {
    await inventoryPage.logout();
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });

  test("inventory is not accessible without logging in", async ({ page }) => {
    await page.goto("/inventory.html");
    await expect(page).toHaveURL("/");
    await expect(page.locator('[data-test="error"]')).toContainText("only access");
  });
});
