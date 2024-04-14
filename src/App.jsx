import Instrument from "../components/Instrument";
import basic from "../synthesizers/basic/basic.json";

export default function App() {
  return (
    <>
      <Instrument name="basic" contents={basic} />
    </>
  );
}
