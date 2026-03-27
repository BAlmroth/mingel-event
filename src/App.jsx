import { ChooseRole } from "./components/ProfileStartup/ChooseRole";
import { CreateProfile } from "./components/ProfileStartup/CreateProfile";
import { BottomNav } from "./components/Navigation/BottomNav";
import { Routes, Route } from "react-router-dom";
import { MyProfile } from "./components/MyProfile/MyProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ChooseRole />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/create-profile-linkedin" element={<CreateProfile />} /> {/*after linkedin login*/}
        <Route path="/profile" element={<MyProfile />} />
      </Routes>
      <BottomNav />
    </>
  );
}

export default App;
