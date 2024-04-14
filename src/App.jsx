import Knob from "../components/Knob";
import Panel from "../components/Panel";
import basic from "../synthesizers/basic.json";

const components = {
  Knob: Knob,
};

export default function App() {
  let PanelsObject = basic.panels;
  let i = 0;
  let panels = [];
  Object.entries(PanelsObject).forEach(([key, value]) => {
    panels.push(<Panel name={key} contents={value} />);
  });
  return <>{panels}</>;
}
