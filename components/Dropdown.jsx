import React from "react";

export default function Button(props) {
  const value = props.settings.panels[props.panel][props.label];
  const options = props.contents.map((option) => {
    return <option selected={option === value} value={option}>{option}</option>;
  });
  return (
    <div className="dropdown">
      <span className="dropdown--label">{props.label}</span>
      <select 
       data-panel={props.panel}
        className={props.label}
        name={props.label}
        onChange={props.handleChange}>
        {options}
      </select>
    </div>
  );
}
