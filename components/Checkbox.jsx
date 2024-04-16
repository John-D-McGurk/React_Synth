import React from "react";

export default function Checkbox(props) {
  return (
    <div className="checkbox">
      <span className="checkbox--label">{props.label}</span>
      <input type="checkbox" value={props.setting} className={props.label} />
    </div>
  );
}
