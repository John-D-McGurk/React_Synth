// import { env } from "../../.eslintrc.cjs";

const ctx = new AudioContext();
const oscList = [];
for (let i = 0; i < 9; i++) {
  oscList[i] = {};
}
const mainGainNode = ctx.createGain();
mainGainNode.connect(ctx.destination);

let filter;

let customWaveform = null;
let sineTerms = null;
let cosineTerms = null;

class Filter {
  constructor(ctx, state, out1, out2) {
    this.ctx = ctx;
    this.filter = ctx.createBiquadFilter();
    // this.filter.type = state.panels.filter.type;
    // this.filter.Q = state.panels.filter.Q;
    // this.filter.freq = state.panels.filter.frequency;
    // this.filter.gain = state.panels.filter.gain;

    const wetAmount = state.panels.filter.wet / 100;
    this.filter.wet = ctx.createGain();
    // this.filter.wet.gain = wetAmount
    this.filter.wet.connect(out1);
    this.filter.dry = ctx.createGain()
    // this.filter.dry.gain = 1 - wetAmount;
    this.filter.dry.connect(out1);
    this.filter.connect(this.filter.wet);
  }
}

class Osc {
  constructor(ctx, type, freq, envelope, out1, out2) {
    this.ctx = ctx;
    this.envelope = envelope;
    this.osc = ctx.createOscillator();
    this.osc.frequency.value = freq;
    this.osc.type = type || "sine";
    this.envGain = ctx.createGain();
    this.envGain.gain.value = 0;
    this.osc.connect(this.envGain);
    // this.envGain.connect(out1);
    console.log(out2)
    this.envGain.connect(out1);
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

export function addFilter(state) {
  filter = new Filter(ctx, state, mainGainNode);
  console.log(filter)
}


export function addOsc(dataset, state) {
  const freq = state.keys[dataset.note][dataset.octave].freq,
    envelope = state.panels.envelope;
  oscList[dataset.octave][dataset.note] = new Osc(
    ctx,
    "sine",
    freq,
    envelope,
    filter.filter,
    filter.dry
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
