import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MediaPose from "./components/Pose";
import Profile from "./components/Profile";
import Hero from "./pages/Hero";
import Workout from "./pages/Workout";
import Navbar from "./components/navbar";
import DietSuggestionPage from "./components/diet";
import AboutSection from "./pages/About";
import Challenge from "./components/Challenge";




export default function App() {
  return (
<div>
    <Navbar/> 
    <div className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 h-19">
    </div>

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/pose" element={<MediaPose />} />
        <Route path="/diet" element={<DietSuggestionPage/>} />
        <Route path="/about" element={<AboutSection/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/challenge" element={<Challenge/>} />
      </Routes>

</div>
  );
}