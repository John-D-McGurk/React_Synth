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
  } else if (props.name === "octave" && props.contents) {
    InputsObject = {
      octaveUp: { type: "Button" },
      octaveDown: { type: "Button" },
    };
  } else {
    InputsObject = props.contents.inputs;
    // for const [key, value] of Object.entries(InputsObject)
  }

  if (InputsObject) {
    for (const [key, value] of Object.entries(InputsObject)) {
      const Type = components[value.type];
      // console.log(props);
      if (props.settings) {
        value.setting = props.settings[key];
      }
      inputs.push(
        <Type
          handleChange={props.handleChange}
          label={key}
          setting={value.setting}
          panel={props.name}
        />
      );
      i++;
    }
    return <div className="panel">{inputs}</div>;
  }
}
