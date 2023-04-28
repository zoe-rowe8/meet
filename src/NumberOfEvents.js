import React, { Component } from 'react';
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  constructor() {
    super();
    this.state = {
      query: 8,
      errorText: "",
    };
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value >= 1 || value <= 8) {
      this.setState({
        query: value,
        errorText: "",
      });
      this.props.updateEvents(this.props.selectedCity, value);
    }
    if (value < 1 || value > 8) {
      this.setState({
        query: value,
        errorText: "Try choosing a number betwwen 1 and 8.",
      });
    }
  };

  render() {
    return (
      <div className='numberOfEvents'>
        <input
          type='number'
          className='numberOfEvents'
          min={1}
          max={8}
          value={this.state.query}
          onChange={this.handleInputChanged}
        />
        <ErrorAlert className='errorMessage' text={this.state.errorText} />
      </div>
    );
  }
}

export default NumberOfEvents;