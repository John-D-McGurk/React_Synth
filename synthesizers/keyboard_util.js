import { addOsc, removeOsc } from "../synthesizers/basic/basic";

export function notePressed(e, state) {
  e.stopPropagation();
  if (e.buttons & 1) {
    const dataset = e.target.dataset,
      note = dataset.note,
      octave = dataset.octave;
    // when dragged from natural to sharp notes parent must be deactivated
    // as mouse is still over child of parent.
    if (note.includes("#")) {
      const parent = e.target.closest(".keyboard--white-note"),
        parentNote = parent.dataset.note,
        parentOctave = parent.dataset.octave;
      if (parent.dataset.pressed) {
        innerRelease(parent.dataset, state);
      }
    }
    if (!state.keys[note][octave].active && octave) {
      dataset.pressed = true;
      //   setState((prevState) => {
      //     return {
      //       ...prevState,
      //       keys: {
      //         ...prevState.keys,
      //         [note]: {
      //           ...prevState.keys[note],
      //           [octave]: {
      //             ...prevState.keys[note][octave],
      //             active: true,
      //           },
      //         },
      //       },
      // };
    }

    addOsc(dataset, state);
  }
}

function innerRelease(dataset, state) {
  removeOsc(dataset, state);
  delete dataset["pressed"];

  //   setState((prevState) => {
  //     return {
  //       ...prevState,
  //       keys: {
  //         ...prevState.keys,
  //         [dataset.note]: {
  //           ...prevState.keys[dataset.note],
  //           [dataset.octave]: {
  //             ...prevState.keys[dataset.note][dataset.octave],
  //             active: false,
  //           },
  //         },
  //       },
  //     };
  //   });
}

export function noteReleased(e, state, setState) {
  const dataset = e.target.dataset,
    note = dataset.note,
    octave = dataset.octave;
  // console.log(oscList);
  if (dataset.pressed) {
    //   console.log(oscList[octave][note]);
    innerRelease(dataset, state);
  }
}
