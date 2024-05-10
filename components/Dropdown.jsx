import React from "react";
import waveTableNames from "../synthesizers/basic/wave-tables/wave_names.json";

export default function Button(props) {
  const value = props.settings[props.panel][props.label];
  let optionList = props.contents;
  if (props.panel === "waveform") {
    optionList = optionList.concat(waveTableNames);
  }
  const options = optionList.map((option) => {
    return (
      <option selected={option === value} value={option}>
        {option}
      </option>
    );
  });

  return (
    <div className="dropdown">
      <span className="dropdown--label">{props.label}</span>
      <select
        data-panel={props.panel}
        className={props.label}
        name={props.label}
        onChange={props.handleChange}
        value={value}
      >
        {options}
      </select>
    </div>
  );
}
