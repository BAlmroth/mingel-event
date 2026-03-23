import { BrowserRouter } from "react-router-dom";
import { ChooseRole } from "./components/ProfileStartup/ChooseRole";

function App() {
  return (
    <BrowserRouter>
      <section>
        <ChooseRole/>
      </section>

      <section>{/* create profile logic */}</section>
    </BrowserRouter>
  );
}

export default App;
