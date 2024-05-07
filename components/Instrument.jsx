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
      pitchMod: { pitch: 50, mod: 0 },
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

  if (props.contents.panels.pitchMod && !state.pitchMod) {
    addPitchMod(setState);
  }

  if (props.contents.inputs.keyboard && !state.keys) {
    addNoteFreqList(setState);
  }

  function handleChange(e) {
    let targetValue = e.target.value;
    let targetName = e.target.name,
      targetPanel = e.target.dataset.panel;
    console.log(targetValue);

    if (!isNaN(targetValue)) {
      targetValue = Number(targetValue);
    }
    // TODO: make this mess more elegant
    // && if changed while holding key release doesn't always work
    // && Don't go above or below max
    if (targetName === "oct +") {
      console.log(state);
      targetValue = state.octave.middleOctave + 1;
      targetName = "middleOctave";
      console.log(targetValue);
    } else if (targetName === "Oct -") {
      targetValue = state.octave.middleOctave - 1;
      targetName = "middleOctave";
    }
    console.log(targetValue);

    setState((prevState) => {
      return {
        ...prevState,
        [targetPanel]: {
          ...prevState[targetPanel],
          [targetName]: targetValue,
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
    <div id="instrument">
      <div id="panels--container">{panels}</div>
      <Keyboard
        notePressed={notePressed}
        noteReleased={noteReleased}
        state={state}
        setState={setState}
      />
    </div>
  );
}
