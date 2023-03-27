Feature: Restful Booker API

    Feature Description

    @Authorization
    Scenario: Auth - Create Token
        Given User registered on the API
        When I access the API request endpoint to create token
            | username | password    |
            | admin    | password123 |
        Then Verify the response status code "200"
        And verify the token is saved on database

    @Authorization
    Scenario: The token contains 15 characters
        Given User registered on the API
        When I access the API request endpoint to create token
            | username | password    |
            | admin    | password123 |
        Then Verify the response status code "200"
        And Verify the token contains "15" characters