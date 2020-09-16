import React, { useState, useRef, useContext, useEffect } from "react";
import EventModal from "../components/Modal/EventModal";
import Backdrop from "../components/Backdrop/Backdrop";
import { AuthContext } from "../context/GraphqlState";
import EventList from "../components/Event/EventList";
import Spinner from "../components/Spinner/Spinner";
import { Event } from "../context/type";
import "../pageStyles/Events.css";

const Events: React.FC = () => {
  const graphqlContext = useContext(AuthContext);
  const {
    createEvent,
    fetchEvents,
    userId,
    events,
    isAuthenticated,
    loading,
    eventSelected,
    clearSelectedEvent,
    event
  } = graphqlContext;
  const [creating, setCreating] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const openModal = () => {
    setCreating(true);
  };

  const handleConfirm = () => {
    setCreating(false);
    let event = {
      title: "",
      price: 0,
      description: ""
    };

    if (titleRef.current) {
      event.title = titleRef.current.value;
    }
    if (priceRef.current) {
      event.price = +priceRef.current.value;
    }
    if (descriptionRef.current) {
      event.description = descriptionRef.current.value;
    }

    if (createEvent) {
      createEvent(event);
    }
  };

  const handleCancel = () => {
    setCreating(false);
  };

  const handleShowBookingModal = (event: Event) => {
    if (eventSelected) {
      eventSelected(event);
    }
  };

  const handleCancelBooking = () => {
    if (clearSelectedEvent) {
      clearSelectedEvent();
    }
  };

  useEffect(() => {
    if (fetchEvents) {
      fetchEvents();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      {(creating || event) && <Backdrop />}
      {creating && (
        <EventModal
          title="New Event"
          canCancel
          canConfirm
          confirmText="Confirm"
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        >
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
              <label htmlFor="description">Description</label>
              <textarea name="description" id="description" rows={4} ref={descriptionRef}></textarea>
            </div>
          </form>
        </EventModal>
      )}
      {event && (
        <EventModal
          title="Book Event"
          canCancel
          canConfirm
          confirmText="Book Event"
          onCancel={handleCancelBooking}
          onConfirm={handleConfirm}
        >
          <h1>{event.title}</h1>
          <h2>
            £{event.price} - {new Date(+event.date).toLocaleDateString()}
          </h2>
          <p>{event.description}</p>
        </EventModal>
      )}
      {isAuthenticated && (
        <div className="events-control">
          <p>Share your own Events!</p>
          <button className="btn" onClick={openModal}>
            Create Event
          </button>
        </div>
      )}
      {loading ? (
        <Spinner />
      ) : (
        <ul className="events__list">
          {events &&
            events.map((event: any) => (
              <EventList key={event._id} event={event} userId={userId!} showBookingModal={handleShowBookingModal} />
            ))}
        </ul>
      )}
    </React.Fragment>
  );
};

export default Events;
