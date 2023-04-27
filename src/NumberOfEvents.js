import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state={
    numberOfEvents: 8,
    errorText: ''
  }

  handleInputChanged = (event) => {
    const number = event.target.value;
    this.setState({ numberOfEvents: number});

    if (number < 1 || number > 8) {
        alert('Try choosing a number from 1 to 8.')
    } else {
      this.setState({
        numberOfEvents: number,
        errorText: ''
      });
    }
  };

  render() {
    return(
      <div className='NumberOfEvents'>
        <p>Number of Events:</p>
        <input 
          type = 'number'
          className = 'numberOfEvents'
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents;