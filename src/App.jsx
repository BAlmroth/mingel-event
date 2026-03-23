import "./App.css";
import { ChooseRole } from "./components/ChooseRole";

function App() {
  return (
    <>
      <ChooseRole title="Student" description="I'm here to learn and connect" />

      <ChooseRole title="Industry" description="I'm here to meet talent" />
    </>
  );
}

export default App;
