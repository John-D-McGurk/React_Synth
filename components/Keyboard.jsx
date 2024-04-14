import React from "react";

export default function Keyboard(props) {
  let keyboard = [];
  let notes = ["C", "D", "E", "F", "G", "A", "B"];

  props.octaves.forEach((octave) => {
    keyboard = keyboard.concat(
      notes.map((note) => {
        const naturalNote = note + octave;
        const sharpNote = note + "#" + octave;
        return (
          <div
            data-note={note}
            data-octave={octave}
            className="keyboard--white-note"
            onMouseDown={props.notePressed}
            onMouseUp={props.noteReleased}
            onMouseOver={props.notePressed}
            onMouseLeave={props.noteReleased}
          >
            <span className="keyboard--white-note-label">{naturalNote} </span>
            {note !== "E" && note != "B" && (
              <div
                data-note={note + "#"}
                data-octave={octave}
                className="keyboard--black-note"
                onMouseDown={props.notePressed}
                onMouseUp={props.noteReleased}
                onMouseOver={props.notePressed}
                onMouseLeave={props.noteReleased}
              >
                <span className="keyboard--black-note-label">{sharpNote}</span>
              </div>
            )}
          </div>
        );
      })
    );
  });
  return <div id="keyboard">{keyboard}</div>;
}
