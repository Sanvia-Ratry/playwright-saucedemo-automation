class InventoryPage {
  constructor(page) {
    this.page = page;
    this.sortDropdown = page.getByRole("combobox");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.cartLink = page.locator(".shopping_cart_link");
    this.prices = page.locator(".inventory_item_price");
  }

  product(name) {
    return this.page.locator(".inventory_item").filter({ hasText: name });
  }

  async addToCart(name) {
    await this.product(name).getByRole("button", { name: "Add to cart" }).click();
  }

  async removeFromCart(name) {
    await this.product(name).getByRole("button", { name: "Remove" }).click();
  }

  async sortBy(option) {
    await this.sortDropdown.selectOption(option);
  }

  async getPrices() {
    const texts = await this.prices.allTextContents();
    return texts.map((p) => Number(p.replace("$", "")));
  }

  async openCart() {
    await this.cartLink.click();
  }
}

export default InventoryPage;
