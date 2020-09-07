import React from "react";
import "../pageStyles/Events.css";
import EventModal from "../components/Modal/EventModal";

const Events: React.FC = () => {
  return (
    <React.Fragment>
      <EventModal title="New Event" canCancel={true} canConfirm={true}>
        <p>Modal Content</p>
      </EventModal>
      <div className="events-control">
        <p>Share your own Events!</p>
        <button className="btn">Create Event</button>
      </div>
    </React.Fragment>
  );
};

export default Events;
