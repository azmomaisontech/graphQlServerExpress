import React from "react";
import "../../pageStyles/Events.css";

interface Props {
  event: string;
}

const EventList: React.FC<Props> = ({ event }) => {
  return <li className="events__list-item">{event}</li>;
};

export default EventList;
