import { token } from "./token-page";

let bookingId = 0;

export const getAllBookingIds = () => {
    cy.request({
        method: "GET",
        url: `${Cypress.env('api')}/booking`,
        headers: {
            "Content-type": "application/json",
        },
    }).as("endpoint");
}

export const getBookingFilteredByName = (datatable) => {
    datatable.hashes().forEach((row) => {
        cy.request({
            method: "GET",
            url: `${Cypress.env('api')}/booking`,
            headers: {
                "Content-type": "application/json",
            },
            qs: {
                "firstname": row.firstname,
                "lastname": row.lastname
            }
        }).as("endpoint")
    })
}

export const getBookingFilteredByBookingDates = (datatable) => {
    datatable.hashes().forEach((row) => {
        cy.log("bookingdates: " + JSON.stringify(row))
        cy.request({
            method: "GET",
            url: `${Cypress.env('api')}/booking`,
            headers: {
                "Content-type": "application/json",
            },
            qs: {
                "checkin": row.checkin,
                "checkout": row.checkout
            }
        }).as("endpoint")
    })
}

export const createBooking = (datatable) => {
    datatable.hashes().forEach((row) => {
        cy.request({
            method: "POST",
            url: `${Cypress.env('api')}/booking`,
            headers: {
                "Content-type": "application/json",
            },
            body: {
                "firstname": row.firstname,
                "lastname": row.lastname,
                "totalprice": Number(row.totalprice),
                "depositpaid": Boolean(row.depositpaid),
                "bookingdates": {
                    "checkin": row.checkin,
                    "checkout": row.checkout
                },
                "additionalneeds": row.additionalneeds
            }
        }).as("endpoint").then((response)=> {
            cy.log(JSON.stringify(response.body))
        })
    })
}

export const validateBookingId = () => {
    cy.get("@endpoint").then((response) => {
        bookingId = response.body.bookingid;
        expect(bookingId).to.exist;
    })
}

export const getBookingById = () => {
    cy.request({
        method: "GET",
        url: `${Cypress.env('api')}/booking/${bookingId}`,
        headers: {
            "Content-type": "application/json"
        }
    }).as("endpoint") 
}

export const updateBookingById = (datatable) => {
    datatable.hashes().forEach((row) => {
        cy.request({
            method: "PUT",
            url: `${Cypress.env('api')}/booking/${bookingId}`,
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "Cookie": `token=${token}`
            },
            body: {
                "firstname": row.firstname,
                "lastname": row.lastname,
                "totalprice": Number(row.totalprice),
                "depositpaid": Boolean(row.depositpaid),
                "bookingdates": {
                    "checkin": row.checkin,
                    "checkout": row.checkout
                },
                "additionalneeds": row.additionalneeds
            }
        }).as("endpoint")
    })
}

export const validateUpdateBookingId = (datatable) => {
    cy.get("@endpoint").then((response) => {
        datatable.hashes().forEach((row) => {
            expect(row.firstname).to.equal(response.body.firstname);
            expect(row.lastname).to.equal(response.body.lastname);
            expect(Number(row.totalprice)).to.equal(response.body.totalprice);
            expect(Boolean(row.depositpaid)).to.equal(response.body.depositpaid);
            expect(row.checkin).to.equal(response.body.bookingdates.checkin);
            expect(row.checkout).to.equal(response.body.bookingdates.checkout);
            expect(row.additionalneeds).to.equal(response.body.additionalneeds);
        })
    })
}

export const patchBookingById = (datatable) => {
    datatable.hashes().forEach((row) => {
        cy.request({
            method: "PATCH",
            url: `${Cypress.env('api')}/booking/${bookingId}`,
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "Cookie": `token=${token}`
            },
            body:{
                "firstname": row.firstname,
                "lastname": row.lastname
            }
        }).as("endpoint").then((response) => {
            cy.log(JSON.stringify(response.body))
        })
    })
}

export const validatePatchBookingId = (datatable) => {
    cy.get("@endpoint").then((response) => {
        datatable.hashes().forEach((row) => {
            //expect(response.status).to.equal(200);
            expect(row.firstname).to.equal(response.body.firstname);
            expect(row.lastname).to.equal(response.body.lastname);
        })
    })
}

export const deleteBookingById = () => {
        cy.request({
            method: "DELETE",
            url: `${Cypress.env('api')}/booking/${bookingId}`,
            headers: {
                "Content-type": "application/json",
                "Cookie": `token=${token}`
            }
        }).as("endpoint")
}

export const verifydeletingBooking = () => {
    cy.get("@endpoint").then((response) => {
        bookingId = response.body.bookingid;
        expect(bookingId).not.to.be.null;
    })
} 