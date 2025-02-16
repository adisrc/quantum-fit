import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MediaPose from "./components/Pose";
import Profile from "./components/Profile";
import Hero from "./pages/Hero";
import Workout from "./pages/Workout";
import Navbar from "./components/navbar";




export default function App() {
  return (
<div>

     
    
    {/* <MediaPose/> */}
    <Navbar/>

   <div className="mt-20">
   <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/pose" element={<MediaPose />} />
      </Routes>
    </Router>
   </div>

</div>
  );
}