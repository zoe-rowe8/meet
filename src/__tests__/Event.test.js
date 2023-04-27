import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[1]} />);
  })

  test('render show details button', () => {
    expect(EventWrapper.find('.show-details')).toHaveLength(1);
  });

  test('shows details when button is clicked', () => {
    EventWrapper.setState({
      collapsed: true
    });
    EventWrapper.find('.show-details').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(false);
  });

  test('closes details when button is clicked', () => {
    EventWrapper.setState({
      collapsed: false
    });
    EventWrapper.find('.close-details').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(true);
  });

  test("Summary is dispalyed", () => {
    expect(EventWrapper.find('.summary')).toHaveLength(1);
  });

  test('displays event date and time', () => {
    expect(EventWrapper.find('.start-date')).toHaveLength(1);
  });

  test('Event description shows', () => {
    EventWrapper.setState({
      collapsed: false
    });
    expect(EventWrapper.find('.event-description')).toHaveLength(1);
  });

});