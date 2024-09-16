import { Page, Locator, expect } from "@playwright/test";
import { Log } from "../utils/Logger";

export class BasketPage {
  readonly page: Page;
  readonly quantityDropdown: Locator;
  readonly removeButton: Locator;
  readonly cartIcon: Locator;
  readonly subTotalLabel: Locator;
  readonly quantityText: Locator;
  readonly emptyCartMessageLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.quantityDropdown = this.page.locator('select[name="quantity"]');
    this.quantityText = this.page.locator(".a-dropdown-prompt");
    this.removeButton = this.page.locator('input[value="Delete"]');
    this.cartIcon = this.page.locator("#nav-cart");
    this.emptyCartMessageLocator = this.page.locator(
      "div[class='a-row sc-your-amazon-cart-is-empty'] h2"
    );
  }

  async goToBasket() {
    Log.info("Navigating to basket");
    await this.cartIcon.click();
    await expect(this.page).toHaveURL(/cart/);
    Log.info("Basket page loaded");
  }

  async updateQuantity(quantity: string) {
    Log.info(`Updating product quantity to: ${quantity}`);
    await this.quantityDropdown.waitFor({ state: "visible" });
    await this.quantityDropdown.selectOption(quantity);
    await this.quantityText.waitFor({ state: "visible" });
    await expect(this.quantityText).toHaveText(quantity);
    Log.info("Quantity updated successfully \n");
  }

  async removeItem() {
    Log.info("Removing item from basket");
    await this.removeButton.isVisible();
    await this.removeButton.click({ force: true });
    await this.page.reload();
    await this.emptyCartMessageLocator.isVisible();

    const emptyCartTxt: string | null =
      await this.emptyCartMessageLocator.textContent();
    if (emptyCartTxt !== null) {
      expect(emptyCartTxt.trim()).toBe("Your Amazon Cart is empty");
    } else {
      throw new Error("Empty cart message not found.");
    }
    Log.info("Item removed successfully \n");
  }
}
