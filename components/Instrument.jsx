import React from "react";
import Panel from "./Panel";

export default function Instrument(props) {
  let PanelsObject = props.contents.panels;
  let i = 0;
  let panels = [];
  Object.entries(PanelsObject).forEach(([key, value]) => {
    panels.push(<Panel name={key} contents={value} />);
  });
  return <>{panels}</>;
}
