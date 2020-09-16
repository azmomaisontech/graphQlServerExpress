import React from "react";
import { Event } from "../../context/type";
import "../../pageStyles/Events.css";

interface Props {
  event: {
    _id: string;
    title: string;
    price: number;
    date: string;
    description: string;
    creator: {
      _id: string;
    };
  };
  userId: string;
  showBookingModal: (id: Event) => void;
}

const EventList: React.FC<Props> = ({ event, userId, showBookingModal }) => {
  const date = new Date(+event.date).toLocaleDateString();
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
          <button className="btn" onClick={() => showBookingModal(event)}>
            View Details
          </button>
        )}
      </div>
    </li>
  );
};

export default EventList;
