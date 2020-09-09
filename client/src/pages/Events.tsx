import React, { useState, useRef, useContext } from "react";
import EventModal from "../components/Modal/EventModal";
import Backdrop from "../components/Backdrop/Backdrop";
import { AuthContext } from "../context/GraphqlState";
import { CreateEvent } from "../context/type";
import "../pageStyles/Events.css";

const Events: React.FC = () => {
  const graphqlContext = useContext(AuthContext);
  const { createEvent } = graphqlContext;
  const [creating, setCreating] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const openModal = () => {
    setCreating(true);
  };

  const handleConfirm = () => {
    setCreating(false);
    const event: Partial<CreateEvent> = {};
    if (titleRef.current) {
      event.title = titleRef.current.value;
    }
    if (priceRef.current) {
      event.price = +priceRef.current.value;
    }
    if (dateRef.current) {
      event.date = dateRef.current.value;
    }
    if (descriptionRef.current) {
      event.description = descriptionRef.current.value;
    }
    console.log(event);
    if (createEvent) {
      createEvent(event);
    }
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
              <input type="datetime-local" id="date" ref={dateRef} />
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
