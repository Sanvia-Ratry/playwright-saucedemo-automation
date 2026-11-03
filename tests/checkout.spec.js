import { test, expect } from "../fixtures/test.js";
import { checkoutFields } from "../test-data/users.js";

const BACKPACK = "Sauce Labs Backpack";

test.describe("Checkout validation", () => {
  for (const c of checkoutFields) {
    test(`checkout requires ${c.name}`, async ({ page, inventoryPage, cartPage, checkoutPage }) => {
      await inventoryPage.addToCart(BACKPACK);
      await inventoryPage.openCart();
      await cartPage.checkout();
      await checkoutPage.fillInformation(c.first, c.last, c.zip);

      await expect(checkoutPage.error).toContainText(c.error);
      await expect(page).toHaveURL(/checkout-step-one\.html/);
    });
  }

  test("order total equals item total plus tax", async ({
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await inventoryPage.addToCart(BACKPACK);
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation("Alex", "Tester", "12345");

    const item = await checkoutPage.getAmount(checkoutPage.itemTotal);
    const tax = await checkoutPage.getAmount(checkoutPage.tax);
    const total = await checkoutPage.getAmount(checkoutPage.total);

    expect(item).toBeCloseTo(29.99, 2);
    expect(total).toBeCloseTo(item + tax, 2);
  });
});
