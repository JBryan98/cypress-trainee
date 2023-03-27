import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { config } from "../config";
import {
  createClient,
  deleteClient,
  selectAllClients,
} from "../querys/client/client-querys";

Given("A query to select all clients", () => {
  cy.task("DATABASE", {
    dbConfig: config,
    sql: selectAllClients(),
  }).then((result) => {
    cy.log(result.rows);
    result.rows.forEach((row) => {
      cy.log(JSON.stringify(row));
    });
  });
});

When("verify if users with ids exists {string}", (dni) => {
    cy.task("DATABASE", {
      dbConfig: config,
      sql: deleteClient(dni),
    }).then((result) => cy.log(JSON.stringify(result)));
});

Then("insert client data", (datatable) => {
  datatable.hashes().forEach((row) => {
    cy.log(row.firstName)
    cy.task("DATABASE", {
      dbConfig: config,
      sql: createClient(
        row.firstName,
        row.lastName,
        row.dni,
        row.email,
        row.address,
        row.phone
      ),
    }).then((result) => cy.log(JSON.stringify(result)));
  });
});
