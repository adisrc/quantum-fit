import React, { useState } from "react";
import { FaEdit } from "react-icons/fa"; // Import the edit icon
import DialogBox from "../components/DialogBox"; // Import the DialogBox
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

const exercises = [
  {
    id: 1,
    name: "Bicep Curls",
    image: "../images/bicepcurls.png",
    video: "../videos/bicepcurls.mp4",
  },
  {
    id: 2,
    name: "Push Ups",
    image: "../images/pushup.png",
    video: "../videos/pushup.mp4",
  },
  {
    id: 3,
    name: "Squats",
    image: "../images/squats.png",
    video: "../videos/squats.mp4",
  },
  {
    id: 4,
    name: "Shoulder Press",
    image: "../images/shoulderpress.png",
    video: "../videos/shoulderpress.mp4",
  },
  {
    id: 5,
    name: "Crunches",
    image: "../images/crunches.png",
    video: "../videos/crunches.mp4",
  },
  {
    id: 6,
    name: "Mountain Climbers",
    image: "../images/feature2.png",
    video: "../videos/squats.mp4",
  },
];

const Workout = () => {
  const [hovered, setHovered] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState("null");

  const handleEditClick = (exercise, event) => {
    event.stopPropagation(); // Prevents event bubbling issues
    setSelectedExercise(exercise);
    setOpenDialog(true);
  };
  const navigate = useNavigate();

  const handleStartClick = (exerciseName) => {
    console.log(exerciseName);
    navigate("/pose",{ state : {exerciseName}}); // Passing exercise name as state
  };

  return (
    <>
      <div
        className={`min-h-screen bg-gradient-to-r from-[#141e30] to-[#243b55] py-10 px-6 transition ${
          openDialog ? "blur-sm" : ""
        }`}
      >
        <h1 className="text-center mt-12 text-4xl font-bold text-white mb-8 font-barlow">
          Choose Your{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-300">
            Workout
          </span>
        </h1>

        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="relative bg-gray-900 shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 border border-gray-700"
              onMouseEnter={() => setHovered(exercise.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Edit Icon */}
              <button
                onClick={(event) => handleEditClick(exercise, event)}
                className="absolute top-3 right-3 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600 transition z-50"
              >
                <FaEdit size={20} />
              </button>

              {/* Video or Image */}
              <div className="w-full h-60">
                {hovered === exercise.id ? (
                  <video
                    src={exercise.video}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                  />
                ) : (
                  <img
                    src={exercise.image}
                    alt={exercise.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Exercise Details */}
              <div className="p-4 text-center">
                <h2 className="text-2xl font-bold text-white font-barlow">
                  {exercise.name}
                </h2>
                <button
                  onClick={() => handleStartClick(exercise.name)}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition"
                >
                  Start Workout
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dialog Component with Blur Background */}
      {openDialog && (
        <DialogBox
          exercise={selectedExercise}
          onClose={() => setOpenDialog(false)}
        />
      )}
      <Footer />
    </>
  );
};

export default Workout;
