import React, { useState } from "react";
import Panel from "./Panel";
import Keyboard from "../components/Keyboard";

import data from "../synthesizers/basic/presets/default.json";
import noteFreqList from "../noteFreqs.json";

const ctx = new AudioContext();
const oscList = [];
for (let i = 0; i < 9; i++) {
  oscList[i] = {};
}
let mainGainNode;
mainGainNode = ctx.createGain();
mainGainNode.connect(ctx.destination);

let noteFreq = noteFreqList;
let customWaveform = null;
let sineTerms = null;
let cosineTerms = null;

export default function Instrument(props) {
  let PanelsObject = props.contents.panels;
  let i = 0;
  let panels = [];
  const [state, setState] = useState(data);
  let settings = data;

  if (props.contents.panels.pitchMod && !state.panels.pitchMod) {
    setState((prevState) => {
      return {
        ...prevState,
        panels: { ...prevState.panels, pitchMod: { pitch: 50, mod: 0 } },
      };
    });
  }

  if (props.contents.inputs.keyboard && !state.keys) {
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

  function handleChange(e) {
    const targetValue = e.target.value,
      targetName = e.target.name,
      targetPanel = e.target.dataset.panel;
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

  function audioSetup() {
    mainGainNode.gain.value = state.panels.controls.gain / 100;
  }
  audioSetup();

  function playTone(freq) {
    const osc = ctx.createOscillator();
    osc.connect(mainGainNode);

    osc.frequency.value = freq;
    osc.type = "sine";

    osc.start();

    return osc;
  }

  function notePressed(e) {
    ctx.resume();
    if (e.buttons & 1) {
      const dataset = e.target.dataset,
        note = dataset.note,
        octave = dataset.octave;
      // when dragged from natural to sharp notes parent must be deactivated
      // as mouse is still over child of parent.
      if (note.includes("#")) {
        const parent = e.target.closest(".keyboard--white-note");
        if (parent.dataset.pressed) {
          innerRelease(parent.dataset);
        }
      }
      if (!dataset.pressed && octave) {
        //   console.log(state.keys);

        // console.log(mainGainNode.value);

        dataset.pressed = true;
        oscList[octave][note] = playTone(state.keys[note][octave].freq);

        // console.log(oscList[octave][note]);
      }
    }
  }

  function innerRelease(dataset) {
    oscList[dataset.octave][dataset.note].stop();
    delete oscList[dataset.octave][dataset.note];
    delete dataset.pressed;
  }

  function noteReleased(e) {
    const dataset = e.target.dataset,
      note = dataset.note,
      octave = dataset.octave;
    // console.log(oscList);

    if (dataset && dataset.pressed) {
      //   console.log(oscList[octave][note]);
      if (oscList[octave] && oscList[octave][note]) {
        innerRelease(dataset);
      }
    }
  }

  Object.entries(PanelsObject).forEach(([key, value]) => {
    const settings = state.panels[key];
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
        octaves={settings.octaves}
        notePressed={notePressed}
        noteReleased={noteReleased}
      />
    </>
  );
}
