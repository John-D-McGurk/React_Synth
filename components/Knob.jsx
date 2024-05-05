import React, { useState } from "react";

export default function Knob(props) {
  const value = props.settings.panels[props.panel][props.label];
  return (
    <div className="knob">
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
        className="slider"
      />
      <span>{value}</span>
    </div>
  );
}
