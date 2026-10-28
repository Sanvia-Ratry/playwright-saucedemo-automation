import { test, expect } from "@playwright/test";

test("standard user can view the inventory page", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/inventory\.html/);

  await expect(page.getByText("Sauce Labs Backpack", { exact: true })).toBeVisible();

  await expect(page.getByText("Sauce Labs Bike Light", { exact: true })).toBeVisible();
});

test("products can be sorted by price from low to high", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await page.getByRole("combobox").selectOption("lohi");

  const prices = await page.locator(".inventory_item_price").allTextContents();

  const numericPrices = prices.map((price) => Number(price.replace("$", "")));

  const sortedPrices = [...numericPrices].sort((a, b) => a - b);

  expect(numericPrices).toEqual(sortedPrices);
});

test("user can add a product to the cart", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await page.getByRole("button", { name: "Add to cart" }).first().click();

  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
});

test("user can remove a specific product from the cart", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  const backpack = page.locator(".inventory_item").filter({ hasText: "Sauce Labs Backpack" });

  await backpack.getByRole("button", { name: "Add to cart" }).click();

  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");

  await backpack.getByRole("button", { name: "Remove" }).click();

  await expect(page.locator(".shopping_cart_badge")).toHaveCount(0);
  await expect(backpack.getByRole("button", { name: "Add to cart" })).toBeVisible();
});

test("cart displays the product that was added", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  const backpack = page.locator(".inventory_item").filter({ hasText: "Sauce Labs Backpack" });

  await backpack.getByRole("button", { name: "Add to cart" }).click();

  await page.locator(".shopping_cart_link").click();

  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.getByText("Sauce Labs Backpack", { exact: true })).toBeVisible();

  await expect(page.locator(".cart_quantity")).toHaveText("1");
});

test("user can proceed from cart to checkout", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  const backpack = page.locator(".inventory_item").filter({ hasText: "Sauce Labs Backpack" });

  await backpack.getByRole("button", { name: "Add to cart" }).click();
  await page.locator(".shopping_cart_link").click();

  await page.getByRole("button", { name: "Checkout" }).click();

  await expect(page).toHaveURL(/checkout-step-one\.html/);
  await expect(page.getByText("Checkout: Your Information", { exact: true })).toBeVisible();
});

test("user can submit checkout information", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  const backpack = page.locator(".inventory_item").filter({ hasText: "Sauce Labs Backpack" });

  await backpack.getByRole("button", { name: "Add to cart" }).click();
  await page.locator(".shopping_cart_link").click();
  await page.getByRole("button", { name: "Checkout" }).click();

  await page.getByPlaceholder("First Name").fill("Alex");
  await page.getByPlaceholder("Last Name").fill("Tester");
  await page.getByPlaceholder("Zip/Postal Code").fill("12345");

  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page).toHaveURL(/checkout-step-two\.html/);
  await expect(page.getByText("Sauce Labs Backpack", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Finish" })).toBeVisible();
});

test("user can complete an order successfully", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  const backpack = page.locator(".inventory_item").filter({ hasText: "Sauce Labs Backpack" });

  await backpack.getByRole("button", { name: "Add to cart" }).click();
  await page.locator(".shopping_cart_link").click();
  await page.getByRole("button", { name: "Checkout" }).click();

  await page.getByPlaceholder("First Name").fill("Alex");
  await page.getByPlaceholder("Last Name").fill("Tester");
  await page.getByPlaceholder("Zip/Postal Code").fill("12345");
  await page.getByRole("button", { name: "Continue" }).click();

  await page.getByRole("button", { name: "Finish" }).click();

  await expect(page).toHaveURL(/checkout-complete\.html/);
  await expect(page.getByText("Thank you for your order!", { exact: true })).toBeVisible();
});
