// import { env } from "../../.eslintrc.cjs";

import noteFreqList from "../../noteFreqs.json";

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
    this.filter.type = state.filter.type;
    this.filter.Q.value = state.filter.Q;
    this.filter.frequency.value = state.filter.frequency;
    this.filter.gain.value = state.filter.gain;

    this.wet = ctx.createGain();
    this.dry = ctx.createGain();
    if (state.filter.on) {
      const wetAmount = state.filter.wet / 100;
      this.wet.gain.value = wetAmount;
      this.dry.gain.value = 1 - wetAmount;
    } else {
      this.wet.gain.value = 0;
      this.dry.gain.value = 1;
    }

    this.wet.connect(this.filter);
    this.dry.connect(out1);
    this.filter.connect(out1);
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
    this.envGain.connect(out1);
    this.envGain.connect(out2);
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
  mainGainNode.gain.value = state.controls.gain / 100;
}

export function addFilter(state) {
  filter = new Filter(ctx, state, mainGainNode);
}

export function addOsc(dataset, state) {
  const freq = noteFreqList[dataset.note][dataset.octave],
    envelope = state.envelope,
    type = state.type;

  oscList[dataset.octave][dataset.note] = new Osc(
    ctx,
    state.waveform.wave,
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
