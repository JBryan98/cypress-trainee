import {Given,When,Then} from "@badeball/cypress-cucumber-preprocessor";

import AmazonPage from "../pages/amazon-page"

Given("The amazon homepage is operative", () => {
  cy.visit(Cypress.env("web"));
  AmazonPage.validatePage();
});

When("the user searches for {string}", (products) => {
  AmazonPage.searchProduct(products);
});

Then("selects {string}", (product) => {
  AmazonPage.selectOption(product);
});

Then("navigates to page number {string}", (number) => {
  AmazonPage.browserPage(number);
});
Then("selects the third item", () => {
  AmazonPage.selectThirdItem();
});
Then("confirm message {string}", (message) => {
  AmazonPage.confirmMessage(message);
});
