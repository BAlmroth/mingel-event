import { ChooseRole } from "./components/ProfileStartup/ChooseRole";
import {  CreateProfile } from "./components/ProfileStartup/CreateProfile";

function App() {
  return (
    <>
      <section>
        <ChooseRole/>
      </section>

      <section>
        <CreateProfile/>
      </section>
    </>
  );
}

export default App;
