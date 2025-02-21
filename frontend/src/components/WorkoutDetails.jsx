import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const WorkoutDetails = ({completeSet}) => {
  const location = useLocation();
  const { exerciseName, sets, reps, restTime } = location.state || {};

  // State to track remaining sets
  const [remainingSets, setRemainingSets] = useState(sets);

  // Function to decrease sets when a full set (all reps) is completed
  const handleSetCompletion = () => {
    if (remainingSets > 0) {
      setRemainingSets((prevSets) => prevSets - 1);
    }
  };

  useEffect(() => {
    if(completeSet){
      handleSetCompletion();
    }
  },[completeSet]);
  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-bold text-cyan-400">{exerciseName}</h2>
      <p className="mt-2">Total Sets: {sets}</p>
      <p>Completed Sets: {sets - remainingSets}</p>
      <p>Remaining Sets: {remainingSets}</p>
      <p>Reps per Set: {reps}</p>
      <p>Rest Time: {restTime} sec</p>

      {/* Button to mark set as completed */}
      {remainingSets > 0 ? (
        <button
          onClick={handleSetCompletion}
          className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition"
        >
          Complete Set
        </button>
      ) : (
        <p className="mt-4 text-green-400 font-semibold">Workout Completed! 🎉</p>
      )}
    </div>
  );
};

export default WorkoutDetails;
