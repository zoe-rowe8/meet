import React from 'react';
import App from '../App';
import { mount } from 'enzyme';
import { loadFeature, defineFeature } from "jest-cucumber";

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  
  test('When user hasn\'t specified a number, 32 is the default', ({ given, when, then }) => {
    let AppWrapper;
    given('the user has not changed the default event number', () => {
      AppWrapper = mount(<App />);

    });

    when('the user searches for events in a city', () => {
      AppWrapper.update();

    });

    then('the default number of events in the city are listed', () => {
      expect(AppWrapper.find('.event')).toHaveLength(2);

    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    let AppWrapper;
    given('the default number of events is listed', () => {
      AppWrapper = mount(<App />);

    });

    when('the user changes the number of events listed', () => {
      AppWrapper.update();
      AppWrapper.find('.numberOfEvents').simulate('change', {target: { value: '1' } });

    });

    then('the number of events chosen is displayed', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.numberOfEvents')).toHaveLength(1);

    });
  });
});