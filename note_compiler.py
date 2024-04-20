import json

noteArray = []
notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G","G#", "A", "A#", "B"]

for octave in range(8):
    for note in notes:
        noteArray.append(f"{note}{octave}")
    
# print(noteArray)

with open('noteArray.json', 'w', encoding='utf-8') as f:
    json.dump(noteArray, f, ensure_ascii=False, indent=4)