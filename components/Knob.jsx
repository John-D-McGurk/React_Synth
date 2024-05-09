import React, { useState } from "react";

export default function Knob(props) {
  const value = props.settings[props.panel][props.label];

  return (
    <div className="knob">
      <div className="knob--visual"></div>
      <span className="knob--label">{props.label}</span>
      <input
        data-panel={props.panel}
        name={props.label}
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        value={value}
        onChange={props.handleChange}
        className="knob--slider"
        style={{
          "--min": props.min || 0,
          "--max": props.max || 100,
          "--value": value || 0,
        }}
      />
      <span>{value}</span>
    </div>
  );
}
