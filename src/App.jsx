import Knob from "../components/Knob";
import Panel from "../components/Panel";
import basic from "../synthesizers/basic.json";

const components = {
  Knob: Knob,
};

export default function App() {
  const Type = components[basic.panels.misc.inputs.gain.type];
  return (
    <>
      <Panel
        names={basic.panels.misc.inputs}
        columns={basic.panels.misc.columns}
      />
    </>
  );
}
