import React from "react";

interface Props {
  title: string;
  children: JSX.Element[] | JSX.Element;
  canCancel: () => void;
  canConfirm: () => void;
}

const EventModal: React.FC<Props> = props => {
  return (
    <div>
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
