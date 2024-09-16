import test from "../fixtures/BaseTest";
const testData = require("../data.json");

test(" Increase the quantity of an item @increaseQty", async ({
  productPage,
  basketPage,
  homePage,
  baseURL,
}) => {
  await homePage.launchApplication(`${baseURL}`);
  await productPage.navigateToProduct(`${baseURL}${testData.productUrl}`);
  await productPage.addToBasket();
  await basketPage.goToBasket();
  await basketPage.updateQuantity("2");
});
