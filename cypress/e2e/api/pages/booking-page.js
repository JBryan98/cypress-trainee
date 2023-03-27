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
        }).as("endpoint")
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


