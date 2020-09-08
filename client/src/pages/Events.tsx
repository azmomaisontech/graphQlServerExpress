import React, { useState, useRef } from "react";
import EventModal from "../components/Modal/EventModal";
import "../pageStyles/Events.css";
import Backdrop from "../components/Backdrop/Backdrop";

const Events: React.FC = () => {
  const [creating, setCreating] = useState(false);

  const titleRef = useRef<HTMLInputElement | null | undefined>();
  const priceRef = useRef();
  const dateRef = useRef();
  const descriptionRef = useRef<HTMLInputElement>(null);

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
          <form>
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" ref={titleRef} />
            </div>
            <div className="form-control">
              <label htmlFor="price">Price</label>
              <input type="number" id="price" />
            </div>
            <div className="form-control">
              <label htmlFor="date">Date</label>
              <input type="date" id="date" />
            </div>
            <div className="form-control">
              <label htmlFor="description">Description</label>
              <textarea name="description" id="description" rows={4}></textarea>
            </div>
          </form>
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
