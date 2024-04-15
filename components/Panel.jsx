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
      attack: { type: "Knob", max: 5, step: 0.01 },
      decay: { type: "Knob", max: 5, step: 0.01 },
      sustain: { type: "Knob", max: 1, step: 0.01 },
      release: { type: "Knob", max: 5, step: 0.01 },
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

      inputs.push(
        <Type
          handleChange={props.handleChange}
          label={key}
          settings={props.settings}
          panel={props.name}
          max={value.max}
          step={value.step}
        />
      );
      i++;
    }
    return <div className="panel">{inputs}</div>;
  }
}
