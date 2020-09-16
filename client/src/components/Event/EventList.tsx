import React from "react";
import "../../pageStyles/Events.css";

interface Props {
  event: {
    title: string;
    price: number;
    date: string;
    creator: {
      _id: string;
    };
  };
  userId: string;
}

const EventList: React.FC<Props> = ({ event, userId }) => {
  const date = new Date(event.date).toLocaleDateString();
  console.log(date);
  console.log(event.date);
  return (
    <li className="events__list-item">
      <div>
        <h1> {event.title}</h1>
        <h2>
          £{event.price} - {date}
        </h2>
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
