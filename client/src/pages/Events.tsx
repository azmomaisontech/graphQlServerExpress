import React, { useState, useRef } from "react";
import EventModal from "../components/Modal/EventModal";
import "../pageStyles/Events.css";
import Backdrop from "../components/Backdrop/Backdrop";

const Events: React.FC = () => {
  const [creating, setCreating] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const openModal = () => {
    setCreating(true);
  };

  interface Event {
    title: string;
    price: string;
    date: string;
    description: string;
  }

  const handleConfirm = () => {
    // let event: Partial<Event>;
    let title, price, date, description;
    setCreating(false);
    if (titleRef.current) {
      title = titleRef.current.value;
    }
    if (priceRef.current) {
      price = priceRef.current.value;
    }
    if (dateRef.current) {
      date = dateRef.current.value;
    }
    if (descriptionRef.current) {
      description = descriptionRef.current.value;
    }
    const event = { title, price, date, description };
    console.log(event);
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
              <input type="number" id="price" ref={priceRef} />
            </div>
            <div className="form-control">
              <label htmlFor="date">Date</label>
              <input type="date" id="date" ref={dateRef} />
            </div>
            <div className="form-control">
              <label htmlFor="description">Description</label>
              <textarea name="description" id="description" rows={4} ref={descriptionRef}></textarea>
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
