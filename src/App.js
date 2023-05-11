import React, { Component } from 'react';
import './App.css';
import {EventList} from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
      const { locations, numberOfEvents, events } = this.state;
      return (
        <div className="App">
          <h1>Meet App</h1>
          <h4>Choose your nearest city</h4>
          <CitySearch updateEvents={this.updateEvents} locations={locations} />
          <NumberOfEvents
            updateEvents={this.updateEvents}
            numberOfEvents={numberOfEvents}
          />       
           <h4>Events in each city</h4>
  
          <ResponsiveContainer height={400} >
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis
                allowDecimals={false}
                type="number"
                dataKey="number"
                name="number of events"
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
          <EventList events={events} />
        </div>
      );
    }
  
}

export default App;