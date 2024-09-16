import { Page, Locator, expect } from "@playwright/test";
import { Log } from "../utils/Logger";
export class ProductPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly cartItemCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = this.page.locator("#add-to-cart-button");
    this.cartItemCount = this.page.locator("#nav-cart-count");
  }

  async navigateToProduct(productUrl: string) {
    Log.info(`Navigating to product page: ${productUrl}`);
    https: await this.page.goto(productUrl);
    await expect(this.page).toHaveURL(productUrl);
    Log.info(`Navigation successful to: ${productUrl}`);
  }

  async addToBasket() {
    Log.info("Attempting to add product to basket");
    await expect(this.addToCartButton).toBeVisible();
    await this.addToCartButton.click({ force: true });
    await expect(this.cartItemCount).toBeVisible();
    Log.info("Product added to basket");
  }
}
