import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import HeightWeightPopup from '../components/HeightWeightPopup'
import { USER_API_END_POINT } from "../utils/constant";

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [workoutType, setWorkoutType] = useState("None");
  const [userData, setUserData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      getUserData();
    }
  }, [isLoaded, isSignedIn]);

  const getUserData = async () => {
    if (user) {
      try {
        const response = await axios.post(`${USER_API_END_POINT}/user`, {
          userId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
        });

        if (response.data.success) {
          setUserData(response.data.user);

          // Check if weight and height are missing
          if (!response.data.user.height || !response.data.user.weight) {
            setShowPopup(true); // Show popup if data is missing
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  return (
    <WorkoutContext.Provider value={{ workoutType, setWorkoutType, isLoaded, isSignedIn, user, userData }}>
      {children}
      <HeightWeightPopup isOpen={showPopup} onClose={() => setShowPopup(false)}/>
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  return useContext(WorkoutContext);
};