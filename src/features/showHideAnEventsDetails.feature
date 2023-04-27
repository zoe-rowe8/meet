Feature: Show/hide event details

  Scenario: An event element is collapsed by default
    Given user searched for events in a city
    When the user selects the event of choice
    Then the event displays a quick glance of event

  Scenario: User can expand an event to see its details
    Given event has been displayed
    When the user selects the event from search results
    Then user clicks on arrow to expand more event details

  Scenario: User can collapse an event to hide its details
    Given event details are shown
    When user expands the details upon search
    Then user can click on arrow to hide event details