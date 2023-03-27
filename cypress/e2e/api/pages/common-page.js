export const validateResponse = (statusCode) => {
    cy.get("@endpoint").then((response) => {
        expect(response.status).to.equal(Number(statusCode));
        cy.log(response.body);
    });
}