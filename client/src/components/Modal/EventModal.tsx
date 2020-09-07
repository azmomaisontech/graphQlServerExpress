import React from "react";
import "./EventModal.css";

interface Props {
  title: string;
  children: JSX.Element[] | JSX.Element;
  canCancel: boolean;
  canConfirm: boolean;
}

const EventModal: React.FC<Props> = props => {
  return (
    <div className="modal">
      <header>{props.title}</header>
      <section className="modal__content">{props.children}</section>
      <section className="modal__actions">
        {props.canCancel && <button className="btn">Cancel</button>}
        {props.canConfirm && <button className="btn">Confirm</button>}
      </section>
    </div>
  );
};

export default EventModal;
