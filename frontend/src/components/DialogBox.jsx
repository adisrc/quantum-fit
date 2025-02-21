import React, { useState } from "react";

const DialogBox = ({ exercise, onClose }) => {
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(12);
  const [restTime, setRestTime] = useState(30);

  return (
    <div className="rounded-xl p-6 shadow-lg w-96 h-96 text-center bg-white fixed inset-0 bg-opacity-50 mx-auto my-auto backdrop-blur-md z-50">
      {/* <div className="bg-white rounded-xl p-6 shadow-lg w-96 text-center relative"> */}
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-black mb-4">
  Time Left: 
  <span className="font-bold text-lg text-green-500 bg-green-100 px-2 py-1 rounded">
    {formatTime(timeLeft)}
  </span>
</h2>
        <h2 className="text-2xl font-bold text-gray-800">Edit {exercise.name}</h2>
        <div className="mt-4 space-y-3">
          <div>
            <label className="block text-gray-700 font-semibold">Sets</label>
            <input
              type="number"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Reps</label>
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Rest Time (seconds)</label>
            <input
              type="number"
              value={restTime}
              onChange={(e) => setRestTime(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
        <div className="mt-5 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-lg hover:scale-105 transition"
          >
            Save
          </button>
        </div>
      {/* </div> */}
    </div>
  );
};

export default DialogBox;
