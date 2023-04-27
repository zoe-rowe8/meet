Feature: Specify Number Of Events

  Scenario: When user hasn't specified a number, 32 is the default
    Given the user has not changed the default event number
    When the user searches for events in a city
    Then the default number of events in the city are listed

  Scenario: User can change the number of events they want to see
    Given the default number of events is listed
    When the user changes the number of events listed
    Then the number of events chosen is displayed