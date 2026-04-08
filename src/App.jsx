import { ChooseRole } from "./components/ProfileStartup/ChooseRole";
import { CreateProfile } from "./components/ProfileStartup/CreateProfile";
import { BottomNav } from "./components/Navigation/BottomNav";
import { MingleFeed } from "./components/Mingle/MingleFeed";
import { Routes, Route } from "react-router-dom";
import { MyProfile } from "./components/MyProfile/MyProfile";
import { UserProfile } from "./components/Mingle/UserProfile";
import { EditMyProfile } from "./components/MyProfile/EditMyProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ChooseRole />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/create-profile-linkedin" element={<CreateProfile />} /> {/*after linkedin login*/}
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/profile/edit" element={<EditMyProfile />} />
        <Route path="/feed" element={<MingleFeed />} />
        <Route path="/profiles/:username" element={<UserProfile />} />
      </Routes>
      <BottomNav />
    </>
  );
}

export default App;
