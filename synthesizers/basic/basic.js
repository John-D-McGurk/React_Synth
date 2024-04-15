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

export function playTone(freq, state) {
  ctx.resume();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator(),
    envelope = ctx.createGain(),
    attack = state.panels.envelope.attack,
    decay = state.panels.envelope.decay,
    sustain = state.panels.envelope.sustain;

  osc.connect(envelope);
  envelope.connect(mainGainNode);

  envelope.gain.setValueAtTime(0, now);
  envelope.gain.linearRampToValueAtTime(1, now + attack);
  envelope.gain.linearRampToValueAtTime(sustain, now + attack + decay);
  osc.frequency.value = freq;
  osc.type = "sine";

  osc.start();

  const oscObject = { osc: osc, env: envelope };

  return oscObject;
}

export function addOsc(dataset, state) {
  const freq = state.keys[dataset.note][dataset.octave].freq;
  oscList[dataset.octave][dataset.note] = playTone(freq, state);
}

export function removeOsc(dataset, state) {
  const octave = dataset.octave,
    note = dataset.note;

  if (oscList[octave] && oscList[octave][note]) {
    const osc = oscList[octave][note].osc,
      env = oscList[octave][note].env,
      now = ctx.currentTime,
      release = state.panels.envelope.release;

    env.gain.linearRampToValueAtTime(0, now + release);
    setTimeout(() => {
      osc.stop();
      delete oscList[octave][note];
    }, release * 1000);
  }
}
