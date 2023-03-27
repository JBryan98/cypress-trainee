import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { validateResponse } from "../pages/common-page";
import {
  obtenerToken,
  saveTokenDB,
  validateTokenDB,
  validateTokenLength,
} from "../pages/token-page";

Given("User registered on the API", () => {});

When("I access the API request endpoint to create token", (datatable) => {
  obtenerToken(datatable);
});

Then("Verify the response status code {string}", (statusCode) => {
  validateResponse(statusCode);
});


Then("verify the token is saved on database", () => {
  saveTokenDB();
  validateTokenDB();
});


Then("Verify the token contains {string} characters", (tokenLength) => {
  validateTokenLength(tokenLength);
});
