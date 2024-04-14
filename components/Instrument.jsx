import React, { useState } from "react";
import Panel from "./Panel";
import Keyboard from "../components/Keyboard";

import data from "../synthesizers/basic/presets/default.json";

export default function Instrument(props) {
  let PanelsObject = props.contents.panels;
  let i = 0;
  let panels = [];
  const [state, setState] = useState(data);
  let settings = data;
  //   console.log(state);
  if (props.contents.panels.pitchMod && !state.panels.pitchMod) {
    setState((prevState) => {
      return {
        ...prevState,
        panels: { pitchMod: { pitch: 50, mod: 0 } },
      };
    });
  }

  function handleChange(e) {
    const targetValue = e.target.value,
      targetName = e.target.name,
      targetPanel = e.target.dataset.panel;
    setState((prevState) => {
      return {
        ...prevState,
        [targetPanel]: { [targetName]: [targetValue] },
      };
    });
  }

  Object.entries(PanelsObject).forEach(([key, value]) => {
    const settings = state.panels[key];
    // console.log(settings);
    panels.push(
      <Panel
        handleChange={handleChange}
        name={key}
        contents={value}
        settings={state}
      />
    );
  });
  return (
    <>
      {panels}
      <Keyboard octaves={settings.octaves} />
    </>
  );
}
