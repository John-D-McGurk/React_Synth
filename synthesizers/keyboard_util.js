import { addOsc, removeOsc } from "../synthesizers/basic/basic";

export function notePressed(e, state) {
  e.stopPropagation();
  if (e.buttons & 1) {
    const dataset = e.target.dataset;
    // when dragged from natural to sharp notes parent must be deactivated
    // as mouse is still over child of parent.
    if (dataset.note.includes("#")) {
      const parent = e.target.closest(".keyboard--white-note");

      if (parent.dataset.pressed) {
        innerRelease(parent.dataset);
      }
    }

    dataset.pressed = true;
    addOsc(dataset, state);
  }
}

function innerRelease(dataset, state) {
  removeOsc(dataset, state);
  delete dataset["pressed"];
}

export function noteReleased(e, state, setState) {
  const dataset = e.target.dataset,
    note = dataset.note,
    octave = dataset.octave;
  if (dataset.pressed) {
    innerRelease(dataset);
  }
}
