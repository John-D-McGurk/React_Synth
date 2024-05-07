import React from "react";

export default function Button(props) {
  const eventPacket = {
    target: { name: props.label, dataset: { panel: props.panel } },
  };
  return (
    <div className="button">
      <button
        data-panel={props.panel}
        name={props.name}
        className={props.label}
        onClick={(e) => props.handleChange(eventPacket)}
      >
        {props.label}
      </button>
    </div>
  );
}
