import React from "react";
import "../../pageStyles/Events.css";

interface Props {
  event: {
    title: string;
    creator: {
      _id: string;
    };
  };
  userId: string;
}

const EventList: React.FC<Props> = ({ event, userId }) => {
  return (
    <li className="events__list-item">
      <div>
        <h1> {event.title}</h1>
        <h2>$19.99</h2>
      </div>
      <div>
        {event.creator._id === userId ? (
          <p>You are the owner of this event.</p>
        ) : (
          <button className="btn">View Details</button>
        )}
      </div>
    </li>
  );
};

export default EventList;
