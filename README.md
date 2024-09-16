# GradientEdge QA Automation Project

## Overview

This project is designed to automate test scenarios on an e-commerce platform Amazon. The main functionalities include navigating to product pages, adding products to the basket, and performing operations such as increasing, decreasing the quantity of items, and removing items from the basket.

## Assumptions

1. **Platform Assumptions**:

   - The tests are designed to work on the Amazon UK website.
   - The platform consistently shows cookie consent popups which need to be accepted for smooth test execution.

2. **Test Execution Assumptions**:

   - The `npm run test:sit` command will run the complete test suite on a pre-configured test environment.
   - The product URLs are dynamically retrieved from a data file (e.g., `data.json`).
   - Environment variables like base URLs and credentials are stored in a `.env` file.

3. **Playwright Configuration**:

   - Playwright is used for browser automation and is expected to handle multiple workers in parallel test execution.
   - Automatic acceptance of cookies is handled globally before each test.
   - Allure is integrated for reporting purposes, and the output is expected in a structured and informative format.

4. **Error Handling**:
   - Any known platform instability, such as intermittent network issues, is handled through retry mechanisms in the test framework.

## Architectural Decisions

1. **Playwright for Automation**:

   - We chose Playwright for its robust support for multi-browser automation, ability to handle cookies and popups natively, and its powerful parallel test execution features.
   - Playwright's locators were chosen based on their stability and consistency across different product pages.

2. **Allure Reporting**:

   - We integrated Allure to provide detailed reporting on test execution, making it easy to track failures, success rates, and other key metrics.
   - The Allure dashboard is expected to provide insights at various levels of test granularity.

3. **Configuration Management**:
   - Configuration files (e.g., `.env` and `data.json`) are used to dynamically pass test data, environment settings, and credentials without hardcoding them in the test scripts.
   - This approach ensures that tests are portable across different environments (dev, sit, production) with minimal modification.

## Instructions for Running Tests

### Prerequisites

1. Ensure that you have Node.js installed on your machine.
2. Install the necessary dependencies:
   npm install

3. Ensure that the following environment variables are set in a `.env` file:
   BASE_URL=https://www.amazon.co.uk
   ENVIRONMENT=sit

4. Populate the `data.json` file with valid product URLs:

   module.exports = {
   productUrl: "/product/{productId}",
   };

### Running Tests and Generate Allure Report.

1.  To run the test suite, use the following command:

        npm run test:sit

2.  After running the tests, you need to generate the Allure report. Use the following npm script:

        npm run allure:generate

3.  To view the generated Allure report, use:
    npm run allure:open

### Running Tests by Tags.

To run tests based on tags, use the --grep option with the Playwright CLI

        npm run test:sit:tags

### Running Tests and Open Allure report:

        npm run test:sit:allure
