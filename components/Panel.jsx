import React from "react";
import Knob from "./Knob";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Dropdown from "./Dropdown";

const components = {
  Knob: Knob,
  Button: Button,
  Checkbox: Checkbox,
  Dropdown: Dropdown,
};

export default function Panel(props) {
  // console.log(props);
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
      "Oct -": { type: "Button" },
      "oct +": { type: "Button" },
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
          min={value.min}
          max={value.max}
          step={value.step}
          contents={value.contents}
        />
      );
      i++;
    }
    const panelId = `panel--${props.name}`;
    return (
      <div className="panel" id={panelId}>
        {inputs}
      </div>
    );
  }
}
