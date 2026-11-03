import { test, expect } from "../fixtures/test.js";

const BACKPACK = "Sauce Labs Backpack";

test.describe("Inventory", () => {
  test("standard user can view the inventory page", async ({ page, inventoryPage }) => {
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.product(BACKPACK)).toBeVisible();
    await expect(inventoryPage.product("Sauce Labs Bike Light")).toBeVisible();
  });

  const sortCases = [
    {
      option: "az",
      label: "name A to Z",
      check: async (p) => {
        const n = await p.getNames();
        expect(n).toEqual([...n].sort());
      },
    },
    {
      option: "za",
      label: "name Z to A",
      check: async (p) => {
        const n = await p.getNames();
        expect(n).toEqual([...n].sort().reverse());
      },
    },
    {
      option: "lohi",
      label: "price low to high",
      check: async (p) => {
        const x = await p.getPrices();
        expect(x).toEqual([...x].sort((a, b) => a - b));
      },
    },
    {
      option: "hilo",
      label: "price high to low",
      check: async (p) => {
        const x = await p.getPrices();
        expect(x).toEqual([...x].sort((a, b) => b - a));
      },
    },
  ];

  for (const s of sortCases) {
    test(`products can be sorted by ${s.label}`, async ({ inventoryPage }) => {
      await inventoryPage.sortBy(s.option);
      await s.check(inventoryPage);
    });
  }
});

test.describe("Cart", () => {
  test("user can add a product to the cart", async ({ inventoryPage }) => {
    await inventoryPage.addToCart(BACKPACK);
    await expect(inventoryPage.cartBadge).toHaveText("1");
  });

  test("user can remove a specific product from the cart", async ({ inventoryPage }) => {
    await inventoryPage.addToCart(BACKPACK);
    await expect(inventoryPage.cartBadge).toHaveText("1");

    await inventoryPage.removeFromCart(BACKPACK);
    await expect(inventoryPage.cartBadge).toHaveCount(0);
    await expect(
      inventoryPage.product(BACKPACK).getByRole("button", { name: "Add to cart" }),
    ).toBeVisible();
  });

  test("cart displays the product that was added", async ({ page, inventoryPage, cartPage }) => {
    await inventoryPage.addToCart(BACKPACK);
    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.getByText(BACKPACK, { exact: true })).toBeVisible();
    await expect(cartPage.quantity).toHaveText("1");
  });
});

test.describe("Checkout", () => {
  test("user can proceed from cart to checkout", async ({ page, inventoryPage, cartPage }) => {
    await inventoryPage.addToCart(BACKPACK);
    await inventoryPage.openCart();
    await cartPage.checkout();

    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await expect(page.getByText("Checkout: Your Information", { exact: true })).toBeVisible();
  });

  test("user can submit checkout information", async ({
    page,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await inventoryPage.addToCart(BACKPACK);
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation("Alex", "Tester", "12345");

    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(page.getByText(BACKPACK, { exact: true })).toBeVisible();
    await expect(checkoutPage.finishButton).toBeVisible();
  });

  test("user can complete an order successfully", async ({
    page,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await inventoryPage.addToCart(BACKPACK);
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation("Alex", "Tester", "12345");
    await checkoutPage.finish();

    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(page.getByText("Thank you for your order!", { exact: true })).toBeVisible();
  });
});
