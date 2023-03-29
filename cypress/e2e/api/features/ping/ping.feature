Feature: Booking page ping automation

    @Ping
        Scenario: Ping - HealthCheck
            Given And endpoint to confirm whethere the API is up and running
            When I access the api request endpoint to confirm the API is running
            Then Verify the response status code "201" 