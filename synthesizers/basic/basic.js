// import { env } from "../../.eslintrc.cjs";

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

class Osc {
  constructor(ctx, type, freq, envelope, out) {
    this.ctx = ctx;
    this.envelope = envelope;
    this.osc = ctx.createOscillator();
    this.osc.frequency.value = freq;
    this.osc.type = type || "sine";
    this.envGain = ctx.createGain();
    this.envGain.gain.value = 0;
    this.osc.connect(this.envGain);
    this.envGain.connect(out);
    this.easing = 0.005;
    this.osc.start();
    this.start();
  }
  start() {
    let now = this.ctx.currentTime;
    this.envGain.gain.cancelScheduledValues(now);
    this.envGain.gain.setValueAtTime(0, now + this.easing);
    this.envGain.gain.linearRampToValueAtTime(
      1,
      now + this.envelope.attack + this.easing
    );
    this.envGain.gain.linearRampToValueAtTime(
      this.envelope.sustain,
      now + this.envelope.attack + this.envelope.decay + this.easing
    );
  }
  stop() {
    let now = this.ctx.currentTime;
    let currentGain = this.envGain.gain.value;
    this.envGain.gain.cancelScheduledValues(now);
    this.envGain.gain.setValueAtTime(currentGain, now);
    this.envGain.gain.setTargetAtTime(
      0,
      now,
      this.envelope.release / 10 + this.easing
    );
    setTimeout(() => {
      this.osc.disconnect();
    }, 10000);
  }
}

export function audioSetup(state) {
  mainGainNode.gain.value = state.panels.controls.gain / 100;
}

export function addOsc(dataset, state) {
  const freq = state.keys[dataset.note][dataset.octave].freq,
    envelope = state.panels.envelope;
  oscList[dataset.octave][dataset.note] = new Osc(
    ctx,
    "sine",
    freq,
    envelope,
    mainGainNode
  );
  // console.log(oscList[dataset.octave][dataset.note])
}

export function removeOsc(dataset) {
  const octave = dataset.octave,
    note = dataset.note;
  if (oscList[octave][note]) {
    oscList[octave][note].stop();
  }
}
