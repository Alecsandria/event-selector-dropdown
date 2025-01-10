import React from "react";

import xMark from "../assets/x-mark.svg";
import { SelectedEvent } from "../events";

type SelectedEventsProps = {
  selected: SelectedEvent[];
  onRemove: (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SelectedEvents = (props: SelectedEventsProps) => {
  if (props.selected.length === 0) {
    return <span className="text-slate-500">Select event(s)</span>;
  }

  return <span className="flex items-center gap-2">
    {props.selected.map((event) => (
      <span key={event.id} className="flex items-center gap-2 text-sm bg-gray-300/50 p-2 rounded-full">
        <span className="pl-1">{event.label}</span>
        <span role="button" className="icon-button bg-gray-300 p-1" onClick={props.onRemove(event.id)}>
          <img src={xMark} alt={`Remove ${event.label}`} className="w-3 h-3" />
        </span>
      </span>
    ))}
  </span>
}

export default SelectedEvents;
