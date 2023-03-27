import { saveToken, getToken } from "../../database/querys/token/token-querys";
import { config } from "../../database/config";

export let token = "";

export const obtenerToken = (datatable) => {
  datatable.hashes().forEach((row) => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("api")}/auth`,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        username: row.username,
        password: row.password,
      },
    }).as("endpoint");
  });
};

export const validateTokenLength = (tokenLength) => {
  cy.get("@endpoint").then((response) => {
    token = response.body.token;
    cy.log(token);
    expect(token.length).to.equal(Number(tokenLength));
  });
};

export const saveTokenDB = () => {
  cy.get("@endpoint").then((response) => {
    token = response.body.token;
    cy.task("DATABASE", {
      dbConfig: config,
      sql: saveToken(token),
    });
  });
};

export const validateTokenDB = () => {
  cy.get("@endpoint").then((response) => {
    token = response.body.token;
    cy.task("DATABASE", {
      dbConfig: config,
      sql: getToken(token),
    }).then((result) => {
      cy.log(result.rows);
      result.rows.forEach((row) => {
        cy.log(JSON.stringify(row));
      });
    });
  });
};
