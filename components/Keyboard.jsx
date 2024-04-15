import React from "react";

export default function Keyboard(props) {
  let keyboard = [];
  const notes = ["C", "D", "E", "F", "G", "A", "B"],
    state = props.state,
    setState = props.setState;
  console.log(state);

  props.octaves.forEach((octave) => {
    keyboard = keyboard.concat(
      notes.map((note) => {
        const sharpNote = note + "#";
        return (
          <div
            data-note={note}
            data-octave={octave}
            className="keyboard--white-note"
            onMouseDown={(e) => props.notePressed(e, state, setState)}
            onMouseUp={(e) => props.noteReleased(e, state, setState)}
            onMouseOver={(e) => props.notePressed(e, state, setState)}
            onMouseLeave={(e) => props.noteReleased(e, state, setState)}
            data-pressed={props.state.keys[note][octave].active}
          >
            <span className="keyboard--white-note-label">{note + octave} </span>
            {note !== "E" && note != "B" && (
              <div
                data-note={note + "#"}
                data-octave={octave}
                className="keyboard--black-note"
                onMouseDown={props.notePressed}
                onMouseUp={props.noteReleased}
                onMouseOver={props.notePressed}
                onMouseLeave={props.noteReleased}
                data-pressed={props.state.keys[sharpNote][octave].active}
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
