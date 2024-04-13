import React from "react";

export default function Knob(props) {
  return (
    <div className="knob">
      <span className="knob--label">{props.label}</span>
      <input
        type="range"
        min={0}
        max={100}
        value={props.value}
        className="slider"
      />
    </div>
  );
}
