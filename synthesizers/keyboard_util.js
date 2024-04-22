import { addOsc, removeOsc } from "../synthesizers/basic/basic";

export function notePressed(e, state, isMouse) {
if (isMouse) {
    e.stopPropagation();
}
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
  } else if (!isMouse) {
    e.dataset.pressed = true;
    addOsc(e.dataset, state)
  }
}

function innerRelease(dataset) {
  removeOsc(dataset);
  delete dataset["pressed"];
}

export function noteReleased(e, isMouse) {
  let dataset;
  // console.log(e);
  if(isMouse) {
      dataset = e.target.dataset;
  } else {
    dataset = e.dataset
  }

  if (dataset.pressed) {
    innerRelease(dataset);
  }
}
