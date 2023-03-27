@Amazon
Feature: Test Amazon search functionality

    @HappyPath
    Scenario: Amazon web page
        Given The amazon homepage is operative
        When the user searches for "gaming"
        And selects "gaming keyboard"
        And navigates to page number "2"
        And selects the third item
        And confirm message "Disponible"

    Scenario Outline: Scenario Outline: As a customer when i search for a product, I want to see if the third option on the second page is available for purchase.
        Given The amazon homepage is operative
        When the user searches for "<product>"
        And selects "<option>"
        And navigates to page number "<number>"
        And selects the third item
        Then confirm message "<status>"
        Examples:
            | product | option                        | number | status     |
            | gaming  | gaming keyboard               | 2      | Disponible |
            | reloj   | reloj inteligente para hombre | 2      | Disponible |

    @UnhappyPath
    Scenario: As a customer when i search for Alexa, I want to see if the third option on the second page is available for purchase and can be added to the cart.
        Given The amazon homepage is operative
        When the user searches for "Alexa"
        And selects "alexa speaker"
        And navigates to page number "2"
        And selects the third item
        Then confirm message "Disponible"


