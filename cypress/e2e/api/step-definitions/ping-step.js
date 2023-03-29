import { Given, When } from "@badeball/cypress-cucumber-preprocessor";

import {
    pingPage,
  } from "../pages/ping-page";

Given("And endpoint to confirm whethere the API is up and running", () => {})

When ("I access the api request endpoint to confirm the API is running", () => {
    pingPage();
});