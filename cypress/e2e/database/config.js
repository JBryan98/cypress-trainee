export const config = {
    user: Cypress.env("PG_USER"),
    host: Cypress.env("PG_HOST"),
    database: Cypress.env("PG_DATABASE"),
    password: Cypress.env("PG_PASSWORD"),
    port: Cypress.env("PG_PORT"),
  };