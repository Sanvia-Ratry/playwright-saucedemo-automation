class InventoryPage {
  constructor(page) {
    this.page = page;
    this.sortDropdown = page.getByRole("combobox");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.cartLink = page.locator(".shopping_cart_link");
    this.prices = page.locator(".inventory_item_price");
    this.names = page.locator(".inventory_item_name");
    this.menuButton = page.locator("#react-burger-menu-btn");
    this.logoutLink = page.locator("#logout_sidebar_link");
  }

  product(name) {
    return this.page.locator(".inventory_item").filter({ hasText: name });
  }

  async getNames() {
    return this.names.allTextContents();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
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
