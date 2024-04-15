const ctx = new AudioContext();
const oscList = [];
for (let i = 0; i < 9; i++) {
  oscList[i] = {};
}
let mainGainNode;
mainGainNode = ctx.createGain();
mainGainNode.connect(ctx.destination);

let customWaveform = null;
let sineTerms = null;
let cosineTerms = null;

export function audioSetup(state) {
  mainGainNode.gain.value = state.panels.controls.gain / 100;
}

export function playTone(freq) {
  ctx.resume();

  const osc = ctx.createOscillator();
  osc.connect(mainGainNode);

  osc.frequency.value = freq;
  osc.type = "sine";

  osc.start();

  return osc;
}

export function addOsc(dataset, freq) {
  oscList[dataset.octave][dataset.note] = playTone(freq);
}

export function removeOsc(dataset) {
  const octave = dataset.octave,
    note = dataset.note;

  if (oscList[octave] && oscList[octave][note]) {
    oscList[octave][note].stop();
    delete oscList[octave][note];
  }
}
