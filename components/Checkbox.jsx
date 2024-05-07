import React from "react";

export default function Checkbox(props) {
  console.log(props.settings);
  return (
    <div className="checkbox">
      <span className="checkbox--label">{props.label}</span>
      <input
        data-panel={props.panel}
        name={props.label}
        defaultChecked={props.settings}
        type="checkbox"
        value={props.setting}
        className={props.label}
        onChange={props.handleChange}
      />
    </div>
  );
}
