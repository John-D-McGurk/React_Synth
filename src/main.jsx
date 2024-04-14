import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const audioContext = new AudioContext();
const oscList = [];
let mainGainNode = null;

let noteFreq = null;
let customWaveform = null;
let sineTerms = null;
let cosineTerms = null;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
