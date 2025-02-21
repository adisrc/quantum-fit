import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import HeightWeightPopup from "../components/HeightWeightPopup";
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

  const getDailyLeaderboard = (allUsersData) => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Function to calculate calories for a user based on today's workouts
    const calculateCalories = (user) => {
      return user.workouts
        .filter((workout) => workout.timestamp.startsWith(today)) // Filter today's workouts
        .reduce(
          (total, workout) =>
            total + (workout.reps * 0.5 + workout.duration * 0.1),
          0
        ); // Sample calorie formula
    };

    // Generate leaderboard
    const leaderboardData = allUsersData
      .map((user) => ({
        email: user.email,
        calories: calculateCalories(user),
      }))
      .filter((user) => user.calories > 0) // Exclude users with zero calories
      .sort((a, b) => b.calories - a.calories); // Sort in descending order

    return leaderboardData;
  };

  // Example usage


  const getUserData = async () => {
    if (user) {
      try {
        const response = await axios.post(`${USER_API_END_POINT}/user`, {
          userId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
        });

        if (response.data.success) {
          setUserData(response.data); 
              
          const dailyLeaderboard = getDailyLeaderboard(response.data.allUsersData);
          console.log("Leaderboard: ",dailyLeaderboard);
           if(dailyLeaderboard.length==0)
            setLeaderBoard([
              {
                "email": "user1@example.com",
                "calories": 10.2345
            },
            {
                "email": "user2@example.com",
                "calories": 7.8921
            },
            {
                "email": "user3@example.com",
                "calories": 12.4567
            },
            {
                "email": "user4@example.com",
                "calories": 9.8765
            },
            {
                "email": "user5@example.com",
                "calories": 8.5432
            }
          ])
          else
           setLeaderBoard(dailyLeaderboard);

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
    Squats: { perRep: 0.25, perSecond: 0.09 },
    Crunches: { perRep: 0.25, perSecond: 0.08 }, // Added Crunches
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
    <WorkoutContext.Provider
      value={{
        workoutType,
        setWorkoutType,
        isLoaded,
        isSignedIn,
        user,
        userData,
        leaderboard,
        setLeaderBoard,
      }}
    >
      {children}
      <HeightWeightPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  return useContext(WorkoutContext);
};
