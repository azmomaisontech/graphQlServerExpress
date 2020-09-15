import React from "react";
import "../../pageStyles/Events.css";

interface Props {
  event: string;
  creator: string;
  userId: string;
}

const EventList: React.FC<Props> = ({ event, creator, userId }) => {
  return (
    <li className="events__list-item">
      <div>
        <h1> {event}</h1>
        <h2>$19.99</h2>
      </div>
      <div>
        {creator === userId ? <p>You are the owner of this event.</p> : <button className="btn">View Details</button>}
      </div>
    </li>
  );
};

export default EventList;
