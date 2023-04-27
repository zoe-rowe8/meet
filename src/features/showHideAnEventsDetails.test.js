import React from "react";
import App from '../App';
import { mount } from 'enzyme';
import { loadFeature, defineFeature } from "jest-cucumber";
import { mockData } from "../mock-data";

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

  test('An event element is collapsed by default', ({ given, when, then }) => {
    let AppWrapper;
    given('user searched for events in a city', () => {
      AppWrapper = mount(<App />);
      AppWrapper.update();

    });

    when('the user selects the event of choice', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length);

    });

    then('the event displays a quick glance of event', () => {
      expect(AppWrapper.find('showDetails')).toHaveLength(0);

    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    let AppWrapper;
    given('event has been displayed', async () => {
      AppWrapper = await mount(<App />);

    });

    when('the user selects the event from search results', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(2);
      AppWrapper.find('.event .show-details').at(0).simulate('click');

    });

    then('user clicks on arrow to expand more event details', () => {
      expect(AppWrapper.find('.event .show-details')).toHaveLength(1);

    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    let AppWrapper;
    given('event details are shown', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      AppWrapper.find('.event .show-details').at(0).simulate('click');

    });

    when('user expands the details upon search', () => {
      AppWrapper.find('.event .close-details').at(0).simulate('click')
      expect(AppWrapper.find('.event .close-details')).toHaveLength(0);

    });

    then('user can click on arrow to hide event details', () => {
      expect(AppWrapper.find('.event .close-details')).toHaveLength(0);

    });
  });
});