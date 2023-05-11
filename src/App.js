import React, { Component } from 'react';
import './App.css';
import {EventList} from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 8,
    currentLocation: 'all',

  }

  async componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  updateNumberOfEvents = (numberOfEvents) => {
    this.setState(
      {
        numberOfEvents
      },
      this.updateEvents(this.state.currentLocation)
    );
  };

  updateEvents = (location) => {

    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
      events : events.filter((event) => event.location === location);

      this.setState({
        events: locationEvents
      });
    });
    }

    getData = () => {
      const {locations, events} = this.state;
      const data = locations.map((location)=>{
        const number = events.filter((event) => event.location === location).length
        const city = location.split(', ').shift()
        return {city, number};
      })
      return data;
    };

  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} numberOfEvents={this.state.numberOfEvents} />
        <EventList events={this.state.events} numberOfEvents={this.state.numberOfEvents} updateEvents={this.updateEvents}/>
        <NumberOfEvents updateNumberOfEvents={(number) => {
          this.updateNumberOfEvents(number);}} updateEvents={this.updateEvents}/>
      </div>
    );
  }
}

export default App;