export const pingPage = () => {
    cy.request({
        method: "GET",
        url: `${Cypress.env('api')}/ping`,
    }).as("endpoint")
}