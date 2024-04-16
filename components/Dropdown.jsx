import React from "react";

export default function Button(props) {
  const options = props.contents.map((option) => {
    return <option value={option}>{option}</option>;
  });
  return (
    <div className="dropdown">
      <span className="dropdown--label">{props.label}</span>
      <select value={props.setting} className={props.label}>
        {options}
      </select>
    </div>
  );
}
