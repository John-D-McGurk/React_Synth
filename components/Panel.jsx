import React from "react";
import Knob from "./Knob";

const components = {
  Knob: Knob,
};

export default function Panel(props) {
  let inputs = [];
  let i = 0;
  console.log(props.names.keys);
  for (const [key, value] of Object.entries(props.names)) {
    const Type = components[value.type];
    inputs.push(<Type label={Object.keys(props.names)[i]} />);
    i++;
  }
  return <div className="panel">{inputs}</div>;
}
