import React, { useState } from "react";
import Panel from "./Panel";
import Keyboard from "../components/Keyboard";
import data from "../synthesizers/basic/presets/default.json";
import noteFreqList from "../noteFreqs.json";

import { notePressed, noteReleased } from "../synthesizers/keyboard_util.js";

import {
  audioSetup,
  addOsc,
  removeOsc,
  addFilter,
} from "../synthesizers/basic/basic";

function addPitchMod(setState) {
  setState((prevState) => {
    return {
      ...prevState,
      panels: { ...prevState.panels, pitchMod: { pitch: 50, mod: 0 } },
    };
  });
}

function addNoteFreqList(setState) {
  const keys = {};
  let notes = noteFreqList;
  let notesObject = {};
  Object.entries(notes).forEach((note) => {
    let map = note[1].map((freq) => {
      return { freq: freq, active: false };
    });
    notesObject[note[0]] = map;
  });

  setState((prevState) => {
    return {
      ...prevState,
      keys: notesObject,
    };
  });
}

export default function Instrument(props) {
  let PanelsObject = props.contents.panels;
  let i = 0;
  let panels = [];
  const [state, setState] = useState(data);

  addFilter(state);

  if (props.contents.panels.pitchMod && !state.panels.pitchMod) {
    addPitchMod(setState);
  }

  if (props.contents.inputs.keyboard && !state.keys) {
    addNoteFreqList(setState);
  }

  function handleChange(e) {
    console.log("handleChange");
    let targetValue = e.target.value;
    const targetName = e.target.name,
      targetPanel = e.target.dataset.panel;

    if (!isNaN(targetValue)) {
      targetValue = Number(targetValue);
    }

    setState((prevState) => {
      return {
        ...prevState,
        panels: {
          ...prevState.panels,
          [targetPanel]: {
            ...prevState.panels[targetPanel],
            [targetName]: targetValue,
          },
        },
      };
    });
  }

  audioSetup(state);

  Object.entries(PanelsObject).forEach(([key, value]) => {
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
      <Keyboard
        octaves={props.contents.inputs.octaves}
        notePressed={notePressed}
        noteReleased={noteReleased}
        state={state}
        setState={setState}
      />
    </>
  );
}
