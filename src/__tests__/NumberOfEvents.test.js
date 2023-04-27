import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />)
  });

  test('render text input', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEvents')).toHaveLength(1);
  });

  test('renders text input correctly', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEvents').prop('value')).toBe(8);
  });

  test('change of state when text input changes', () => {
    const numberOfEventObject = {target: {value: '6'}};
    NumberOfEventsWrapper.find('.numberOfEvents').simulate('change', numberOfEventObject);
    expect(NumberOfEventsWrapper.state('value')).toBe()
  });


})