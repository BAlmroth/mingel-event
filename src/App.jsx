import { ChooseRole } from "./components/ProfileStartup/ChooseRole";
import { CreateProfile } from "./components/ProfileStartup/CreateProfile";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ChooseRole />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/create-profile-linkedin" element={<CreateProfile />} /> {/*after linkedin login*/}
      </Routes>
    </>
  );
}

export default App;
