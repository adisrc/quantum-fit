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
    <div className="p-6 m-2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl shadow-xl w-96 backdrop-blur-lg border border-gray-700">
  <div className="flex flex-col items-center text-center">
    <h2 className="text-3xl font-bold text-cyan-400 drop-shadow-lg">Workout Progress</h2>
    
    <p className="mt-4 text-lg font-medium text-gray-300">
      Total Sets: <span className="font-bold text-white">{sets}</span>
    </p>

    {/* <p className="text-lg text-gray-400">Completed Sets: {sets - remainingSets}</p> */}
    
    <p className="text-lg font-medium text-gray-300">
      Remaining Sets: <span className="font-bold text-white">{remainingSets}</span>
    </p>

    <p className="text-lg font-medium text-gray-300">
      Reps per Set: <span className="font-bold text-white">{reps}</span>
    </p>

    {/* <p className="text-lg text-gray-400">Rest Time: {restTime} sec</p> */}

    {/* Motivational Message or Completion Alert */}
    {remainingSets > 0 ? (
      <h2 className="mt-6 text-xl font-semibold text-yellow-400 animate-pulse">
        Keep going..🔥
      </h2>
    ) : (
      <p className="mt-6 text-2xl font-semibold text-green-400 drop-shadow-lg">
        Workout Completed! 🎉
      </p>
    )}
  </div>
</div>
  );
};

export default WorkoutDetails;
