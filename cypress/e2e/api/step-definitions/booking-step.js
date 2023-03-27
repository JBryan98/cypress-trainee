import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import {
  createBooking,
  getAllBookingIds,
  getBookingById,
  getBookingFilteredByBookingDates,
  getBookingFilteredByName,
  updateBookingById,
  validateBookingId,
} from "../pages/booking-page";

Given("The access API request endpoint", () => {});

When("I access the API request endpoint to get all the booking ids", () => {
  getAllBookingIds();
});


When(
  "I acces the API request endpoint to get all the booking ids filtered by name",
  (datatable) => {
    getBookingFilteredByName(datatable);
  }
);

When(
  "I access the API request endpoint to get all the booking ids filtered by bookingdates",
  (datatable) => {
    getBookingFilteredByBookingDates(datatable);
  }
);

Given("Booking not registered on the API", () => {});

When(
  "I access the API request endpoint to create a new booking",
  (datatable) => {
    createBooking(datatable);
  }
);

Then("Verify the response body contains the bookingid", () => {
  validateBookingId();
});

Given("Booking registered on the API", () => {});

When("I access the API request endpoint to get a single booking", () => {
  getBookingById();
});


When("I access the API request endpoint to update a booking", (datatable) => {
  updateBookingById(datatable);
})