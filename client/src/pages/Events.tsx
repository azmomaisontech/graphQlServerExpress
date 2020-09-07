import React from "react";
import EventModal from "../components/Modal/EventModal";
import "../pageStyles/Events.css";
import Backdrop from "../components/Backdrop/Backdrop";

const Events: React.FC = () => {
  return (
    <React.Fragment>
      <Backdrop />
      <EventModal title="New Event" canCancel canConfirm>
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
