import { Page, Locator, expect, Route, BrowserContext } from "@playwright/test";
import { Log } from "../utils/Logger";

export class HomePage {
  readonly page: Page;
  readonly context: BrowserContext;
  readonly acceptCookieForm: Locator;
  readonly acceptCookie: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookie = page.locator("#sp-cc-accept");
    this.acceptCookieForm = page.locator("#sp-cc");
  }

  async navigateToHomePage(appURl: string) {
    Log.info(`launching the  browser: ${appURl}`);
    https: await this.page.goto(appURl);
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.page).toHaveURL(appURl);
    Log.info(`Navigation successful to: ${appURl}`);
  }

  async launchApplication(appURl: string) {
    Log.info("Navigating to Amazon UK");
    await this.page.goto(appURl);
    Log.info("Amazon UK page loaded");
    await this.acceptCookies();
  }

  // Accept cookies function
  async acceptCookies() {
    await this.acceptCookieForm.waitFor({ state: "attached" });
    if (await this.acceptCookie.isVisible()) {
      await this.acceptCookie.click({ force: true });
      Log.info("Cookies accepted!");
    } else {
      Log.info("Cookies button not found or already accepted.");
    }
  }

  async invokeConsentAPI() {
    await this.interceptConsentRequest();
    await this.page.evaluate(async () => {
      await fetch(
        "https://www.amazon.co.uk/privacyprefs/sp/consent/v2/acceptall",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    });
    Log.info("API call invoked and intercepted.");
  }

  // Intercept the privacy consent API call and return a 200 OK response
  async interceptConsentRequest() {
    await this.page.route(
      "**/privacyprefs/sp/consent/v2/acceptall",
      async (route: Route) => {
        Log.info("Intercepting privacy consent request and returning 200 OK");
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            failedConsents: [],
          }),
        });
      }
    );
  }
}
