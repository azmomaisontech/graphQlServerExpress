import React, { useState } from "react";
import EventModal from "../components/Modal/EventModal";
import "../pageStyles/Events.css";
import Backdrop from "../components/Backdrop/Backdrop";

const Events: React.FC = () => {
  const [creating, setCreating] = useState(false);

  const openModal = () => {
    setCreating(true);
  };

  const handleConfirm = () => {
    setCreating(false);
  };

  const handleCancel = () => {
    setCreating(false);
  };

  return (
    <React.Fragment>
      {creating && <Backdrop />}
      {creating && (
        <EventModal title="New Event" canCancel canConfirm onCancel={handleCancel} onConfirm={handleConfirm}>
          <p>Modal Content</p>
        </EventModal>
      )}
      <div className="events-control">
        <p>Share your own Events!</p>
        <button className="btn" onClick={openModal}>
          Create Event
        </button>
      </div>
    </React.Fragment>
  );
};

export default Events;
