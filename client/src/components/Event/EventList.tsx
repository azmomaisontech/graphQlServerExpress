import React from "react";
import "../../pageStyles/Events.css";

interface Props {
  event: {
    _id: string;
    title: string;
    description: string;
    price: number;
    date: string;
    creator: {
      _id: string;
    };
  };
}

const EventList: React.FC<Props> = ({ event }) => {
  const { title, price, description, date, creator } = event;
  return (
    <li className="events__list-item">
      {title}
      {price}
      {description}
      {date}
      {creator}
      <p>Test</p>
    </li>
  );
};

export default EventList;
