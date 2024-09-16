import { Page, Locator, expect, Route, Request } from "@playwright/test";
import { Log } from "../utils/Logger";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator("#ap_email");
    this.passwordInput = page.locator("//input[@id='ap_password']");
    this.signInButton = page.locator("#signInSubmit");
    this.continueButton = page.locator("//input[@id='continue']");
  }

  async navigateToLoginPage(url: string) {
    Log.info(`Navigating to login page: ${url}`);
    await this.page.goto(url);
    await expect(this.page).toHaveURL(url);
    Log.info("Login page loaded successfully");
  }

  async enterEmail(email: string) {
    Log.info(`Entering email: ${email}`);
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string) {
    Log.info(`Entering password: ${password}`);
    await this.passwordInput.fill(password);
  }

  async submitLogin() {
    Log.info("Submitting login form");
    await this.signInButton.click();
  }

  async clickContinue() {
    Log.info("Continue login form");
    await this.continueButton.click();
  }

  async login(email: string, password: string) {
    await this.enterEmail(email);
    await this.clickContinue();
    await this.enterPassword(password);
    await this.submitLogin();
    await this.page.waitForLoadState("networkidle");
  }
}
