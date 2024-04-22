import React, { useEffect, useRef } from "react";

import noteArray from '../noteArray.json'

export default function Keyboard(props) {
  // note index = octave * 12 + note index
  let keyboard = [];
  const notes = ["C", "D", "E", "F", "G", "A", "B"],
  startOctave = props.octaves[0],
  noteIndex = {
    "C" : 0,
    "C#": 1,
    "D" : 2,
    "D#": 3,
    "E" : 4,
    "F" : 5,
    "F#": 6,
    "G" : 7,
    "G#": 8,
    "A" : 9,
    "A#": 10,
    "B" : 11,
  },
  keyMap = {
a: {note:`C`, octave: startOctave},
s: {note:`D`, octave:startOctave},
d: {note:`E`, octave:startOctave}, 
f: {note:`F`, octave:startOctave}, 
g: {note:`G`, octave:startOctave}, 
h: {note:`A`, octave:startOctave}, 
j: {note:`B`, octave:startOctave}, 
w: {note:`C#`, octave:startOctave}, 
e: {note:`D#`, octave:startOctave}, 
t: {note:`F#`, octave:startOctave}, 
y: {note:`G#`, octave:startOctave}, 
u: {note:`A#`, octave:startOctave}, 
k: {note:`C`, octave:startOctave + 1}, 
l: {note:`D`, octave:startOctave + 1}, 
o: {note:`C#`, octave:startOctave + 1}, 
p: {note:`D#`, octave:startOctave + 1}, 
},
    state = props.state,
    setState = props.setState,
    keyRefs = useRef([]);

    useEffect(() => {
      function getKeyDOM(e) {
        if (e.key in keyMap) {
          const keyPressed = keyMap[e.key],
          keyIdx = noteIndex[keyPressed.note],
          fullIdx = keyIdx + keyPressed.octave * 12,
          pressedKey = keyRefs.current[fullIdx];
          return pressedKey;
      }
    }
      function handleKeyDown(e) {
        const pressedKey = getKeyDOM(e);
          if (!pressedKey.dataset.pressed){   
          props.notePressed(pressedKey, state, false)

          e.target.addEventListener('keyup', handleKeyUp);
          }          
          function handleKeyUp (e) {
            const pressedKey = getKeyDOM(e);
            if(pressedKey.dataset.pressed) {
              props.noteReleased(pressedKey, false);
            }

        }
      }
      document.addEventListener('keydown', handleKeyDown);


      return function cleanup() {
        document.removeEventListener('keydown', handleKeyDown)
      }

    })

    const octaveList = [0,1,2,3,4,5,6,7]

  octaveList.forEach(octave => {
    keyboard = keyboard.concat(
      notes.map((note, keyIdx) => {
        const sharpNote = note + "#",
        noteIdx = 12 * octave /*(octave - startOctave)*/ + noteIndex[note]; 
        return (
          <div
          ref={el => keyRefs.current[noteIdx] = el}
            data-note={note}
            data-octave={octave}
            className="keyboard--white-note"
            onMouseDown={(e) => props.notePressed(e, state, true)}
            onMouseUp={(e) => props.noteReleased(e, state, true)}
            onMouseOver={(e) => props.notePressed(e, state, true)}
            onMouseLeave={(e) => props.noteReleased(e, state, true)}
            // data-pressed={props.state.keys[note][octave].active}
          >
            <span className="keyboard--white-note-label">{note + octave} </span>
            {note !== "E" && note != "B" && (
              <div
              ref={el => keyRefs.current[noteIdx + 1] = el}
                data-note={note + "#"}
                data-octave={octave}
                className="keyboard--black-note"
                onMouseDown={(e) => props.notePressed(e, state, true)}
                onMouseUp={(e) => props.noteReleased(e, state, true)}
                onMouseOver={(e) => props.notePressed(e, state, true)}
                onMouseLeave={(e) => props.noteReleased(e, state, true)}
                // data-pressed={props.state.keys[sharpNote][octave].active}
              >
                <span className="keyboard--black-note-label">{sharpNote}</span>
              </div>
            )}
          </div>
        );
      })
    );
  })
  return <div id="keyboard">{keyboard}</div>;
}


function Key(props) {
  
}