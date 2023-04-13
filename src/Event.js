import React, { Component } from "react";

class Event extends Component {
  state = {
    hide: true,
  };

  handleItemClicked = () => {
    this.setState((prevState) => ({
      hide: !prevState.hide,
    }));
  };

  render() {
    const { event } = this.props;
    return (
      <div>
        <b className='title'>Summary: {event.summary}</b>
        {!this.hide && (
          <ul className='details'>
            <li>Description: {event.description}</li>
            <li>Location: {event.location}</li>
            <li>Start: {new Date(event.start.dateTime).toISOString()}</li>
            <li>End: {new Date(event.end.dateTime).toISOString()}</li>
          </ul>
        )}
        <button
          className='detailsButton'
          onClick={() => this.handleItemClicked()}
        >
          Details
        </button>
      </div>
    );
  }
}

export default Event;