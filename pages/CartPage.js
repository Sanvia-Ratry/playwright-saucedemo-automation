class CartPage {
  constructor(page) {
    this.page = page;
    this.quantity = page.locator(".cart_quantity");
    this.checkoutButton = page.getByRole("button", { name: "Checkout" });
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

export default CartPage;
