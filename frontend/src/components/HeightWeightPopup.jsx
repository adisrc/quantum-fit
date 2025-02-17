import React, { useState } from "react";
import { useWorkout } from "../contexts/WorkoutContext";
import axios from "axios";
import {  USER_API_END_POINT } from "../utils/constant";

const HeightWeightPopup = ({ isOpen, onClose }) => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const { workoutType, setWorkoutType, isSignedIn, user } = useWorkout();
  if (!isOpen) return null;

  const handleSubmit = async () => {    
    console.log(user.id, weight, height);
    
    try {
      const response = await axios.post(`${USER_API_END_POINT}/updateWtHt`, {
        userId: user.id,
        weight: parseInt(weight, 10),
        height: parseInt(height, 10),
      },
      {
        headers:{
            'Content-Type':'application/json',
        } ,
         withCredentials : true
     }
    );

      console.log("Data saved successfully:", response.data);
      // onSave({ height, weight });
       onClose();
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  }; 

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-lg font-semibold mb-4">
          Enter Your Height and Weight
        </h2>

        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r mx-auto from-blue-500 to-blue-700 text-white px-5 py-2.5 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeightWeightPopup;