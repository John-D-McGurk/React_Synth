import React from "react";

export default function Button(props) {
  return (
    <div className="button">
      <span className="buton--label">{props.label}</span>
      <input type="button" value={props.value} className={props.label} />
    </div>
  );
}