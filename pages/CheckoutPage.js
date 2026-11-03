class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.getByPlaceholder("First Name");
    this.lastName = page.getByPlaceholder("Last Name");
    this.zipCode = page.getByPlaceholder("Zip/Postal Code");
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.finishButton = page.getByRole("button", { name: "Finish" });
    this.error = page.locator('[data-test="error"]');
    this.itemTotal = page.locator(".summary_subtotal_label");
    this.tax = page.locator(".summary_tax_label");
    this.total = page.locator(".summary_total_label");
  }

  async fillInformation(first, last, zip) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.zipCode.fill(zip);
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }
  async getAmount(locator) {
    const text = await locator.textContent();
    return Number(text.match(/\$([\d.]+)/)[1]);
  }
}

export default CheckoutPage;
