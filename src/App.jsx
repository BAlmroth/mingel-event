import { ChooseRole } from "./components/ProfileStartup/ChooseRole";
import { CreateProfile } from "./components/ProfileStartup/CreateProfile";
import { BottomNav } from "./components/Navigation/BottomNav";
import { MingleFeed } from "./components/Mingle/MingleFeed";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ChooseRole />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/create-profile-linkedin" element={<CreateProfile />} /> {/*after linkedin login*/}
        <Route path="/feed" element={<MingleFeed />} />
      </Routes>
      <BottomNav />
    </>
  );
}

export default App;
