import {
  test as baseTest,
  BrowserContext,
  Page,
  expect,
} from "@playwright/test";
import { BasketPage } from "../pages/BasketPage";
import { ProductPage } from "../pages/ProductPage";
import { HomePage } from "../pages/HomePage";
import path from "path";
import dotenv from "dotenv";

// Load environment variables (SIT, QA) if needed
const env = process.env.TEST_ENV || "qa";
dotenv.config({ path: path.resolve(__dirname, `../.env.${env}`) });

const test = baseTest.extend<{
  context: BrowserContext;
  productPage: ProductPage;
  basketPage: BasketPage;
  homePage: HomePage;
  page: Page;
}>({
  // Creates the context
  context: async ({ browser }, use) => {
    const context = await browser.newContext();
    await use(context);
    await context.clearCookies();
    await context.clearPermissions();
    await context.close();
  },

  // Create a page fixture
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },

  // Inject the product page object into the fixture
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },

  // Inject the basket page object into the fixture
  basketPage: async ({ page }, use) => {
    const basketPage = new BasketPage(page);
    await use(basketPage);
  },

  // Inject the home page object into the fixture
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});

export default test;
