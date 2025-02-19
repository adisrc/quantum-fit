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
  const [leaderboard, setLeaderBoard] = useState([]);

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
           const leaderboardData = response.data.allUsersData.map(user => ({
            email: user.email,
            calories: calculateCalories(user)
        })).sort((a, b) => b.calories - a.calories); // Sort in descending order
        
           console.log(leaderboardData);
           setLeaderBoard(leaderboardData);
           
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

  const calorieMultipliers = {
    "Push Ups": { perRep: 0.3, perSecond: 0.1 },
    "Bicep Curls": { perRep: 0.2, perSecond: 0.08 },
    "Squats": { perRep: 0.25, perSecond: 0.09 },
    "Crunches": { perRep: 0.25, perSecond: 0.08 }, // Added Crunches
  };


  function calculateCalories(user) {
    let totalCalories = 0;

    user.workouts.forEach((workout) => {
      const { workoutType, reps, duration } = workout;
      const multiplier = calorieMultipliers[workoutType] || {
        perRep: 0.1,
        perSecond: 0.05,
      }; // Default values

      totalCalories +=
        reps * multiplier.perRep + duration * multiplier.perSecond;
    });
    return totalCalories;
  }




  return (
    <WorkoutContext.Provider value={{ workoutType, setWorkoutType, isLoaded, isSignedIn, user, userData ,leaderboard,setLeaderBoard}}>
      {children}
      <HeightWeightPopup isOpen={showPopup} onClose={() => setShowPopup(false)}/>
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  return useContext(WorkoutContext);
};