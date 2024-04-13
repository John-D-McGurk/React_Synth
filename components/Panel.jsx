import React from "react";

export default function Panel(props) {
  let knobs;
  return (
    <div className="panel">
      {props.label && <span className="knob--label">{props.label}</span>}
    </div>
  );
}
