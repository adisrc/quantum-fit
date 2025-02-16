import React, { createContext, useContext, useState } from "react";
import { useUser } from "@clerk/clerk-react";

// Create context
const WorkoutContext = createContext();

// Provider component
export const WorkoutProvider = ({ children }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [workoutType, setWorkoutType] = useState("None");

  return (
    <WorkoutContext.Provider value={{ workoutType, setWorkoutType, isLoaded, isSignedIn, user }}>
      {children}
    </WorkoutContext.Provider>
  );
};

// Custom hook to use context
export const useWorkout = () => {
  return useContext(WorkoutContext);
};