import React, { Component } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './App.css';
import {EventList} from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { WarningAlert } from './Alert';
import './nprogress.css';
import EventGenre from './EventGenre';

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

    if (!navigator.onLine) {
      this.setState({
        infoText: 'You are not connected to the Internet!'
      });
    } else {
      this.setState({
        infoText:''
      });
    }
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
      const { locations, events } = this.state;
      const data = locations.map((location) => {
        const number = events.filter((event) => event.location === location).length
        const city = location.split(', ').shift()
        return {city, number};
      })
      return data;
    };

  render() {
    return (
      <div className="App">
        <h1>Meet App</h1>
        <h4>Choose your nearest city</h4>
        <WarningAlert text={this.state.infoText} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} numberOfEvents={this.state.numberOfEvents} />
        <NumberOfEvents updateNumberOfEvents={(number) => {
          this.updateNumberOfEvents(number);}} updateEvents={this.updateEvents}/>

        <h4>Events in each city</h4>
        <div className="data-vis-wrapper">
          <EventGenre events={this.state.events} />
          <ResponsiveContainer height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis type="number" dataKey="number" name="# of events" allowDecimals={false} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#82ca9d" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList events={this.state.events} numberOfEvents={this.state.numberOfEvents} updateEvents={this.updateEvents}/>
      </div>
    );
  }
}

export default App;