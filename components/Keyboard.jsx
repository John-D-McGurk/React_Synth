import React from "react";

export default function Keyboard(props) {
  let keyboard = [];
  let notes = ["C", "D", "E", "F", "G", "A", "B"];

  props.octaves.forEach((octave) => {
    keyboard = keyboard.concat(
      notes.map((note) => {
        return (
          <div data-note={octave + note} className="keyboard--white-note">
            {note !== "E" && note != "B" && (
              <div
                data-note={octave + note + "#"}
                className="keyboard--black-note"
              ></div>
            )}
          </div>
        );
      })
    );
  });
  return <div id="keyboard">{keyboard}</div>;
}
