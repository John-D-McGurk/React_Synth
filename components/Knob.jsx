import React, { useState } from "react";

export default function Knob(props) {
  // const [value, setValue] = useState(props.setting);
  // function handleChange(e) {
  //   setValue(e.target.value);
  // }

  return (
    <div className="knob">
      <span className="knob--label">{props.label}</span>
      <input
        data-panel={props.panel}
        name={props.label}
        type="range"
        min={0}
        max={100}
        // value={value}
        onChange={props.handleChange}
        className="slider"
      />
      {/* <span>{value}</span> */}
    </div>
  );
}
