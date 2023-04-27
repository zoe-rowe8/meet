import React from 'react';
import {Event} from './Event';

export function EventList(props) {
    const { events } = props
    return (
      <div>
        <ul className="Event">
          {events.map(event =>
            <li key={event.id}>
              <Event event={event} />
            </li>
          )}
        </ul>
      </div>
    );
  }

  export default EventList;