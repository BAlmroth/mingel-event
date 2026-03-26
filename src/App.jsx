import { ChooseRole } from "./components/ProfileStartup/ChooseRole";
import { CreateProfile } from "./components/ProfileStartup/CreateProfile";
import { BottomNav } from "./components/Navigation/BottomNav";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ChooseRole />} />
        <Route path="/create-profile" element={<CreateProfile />} />
      </Routes>
      <BottomNav />
    </>
  );
}

export default App;
