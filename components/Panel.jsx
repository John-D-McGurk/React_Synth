import React from "react";
import Knob from "./Knob";
import Button from "./Button";

const components = {
  Knob: Knob,
  Button: Button,
};

export default function Panel(props) {
  let inputs = [];
  let i = 0;
  let InputsObject;
  if (props.name === "envelope" && props.contents) {
    InputsObject = {
      attack: { type: "Knob" },
      decay: { type: "Knob" },
      sustain: { type: "Knob" },
      release: { type: "Knob" },
    };
  } else if (props.name === "pitchMod" && props.contents) {
    InputsObject = {
      pitch: { type: "Knob" },
      mod: {
        type: "Knob",
      },
    };
  } else {
    InputsObject = props.contents.inputs;
  }

  if (InputsObject) {
    for (const [key, value] of Object.entries(InputsObject)) {
      const Type = components[value.type];
      inputs.push(<Type label={Object.keys(InputsObject)[i]} />);
      i++;
    }
    return <div className="panel">{inputs}</div>;
  }
}
