import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MediaPose from "./components/Pose";
import Profile from "./components/Profile";
import Hero from "./pages/Hero";
import Workout from "./pages/Workout";
import Navbar from "./components/navbar";
import Diet from "./components/Diet";
import About from "./components/about";




export default function App() {
  return (
<div>

     
    
    {/* <MediaPose/> */}
    <Navbar/>

   <div className="mt-20">
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/pose" element={<MediaPose />} />
        <Route path="/diet" element={<Diet />} />
        <Route path="/about" element={<About />} />
        
      </Routes>
   </div>

</div>
  );
}