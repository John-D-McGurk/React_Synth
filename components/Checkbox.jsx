import React from "react";

export default function Checkbox(props) {
  return (
    <div className="checkbox">
      <input
        data-panel={props.panel}
        name={props.label}
        defaultChecked={props.settings}
        type="checkbox"
        value={props.setting}
        className={props.label}
        onChange={props.handleChange}
      />{" "}
      <span className="checkbox--label">{props.label}</span>
    </div>
  );
}
