import React from "react";
import { FaFire } from "react-icons/fa";
import { useWorkout } from "../contexts/WorkoutContext";

const Leaderboard = () => {
  // Dummy data for the top 5 users
  const { leaderboard } = useWorkout();
  const users = leaderboard
    .sort((a, b) => b.calories - a.calories) // Sort by highest calories
    .map((user, index) => ({
        rank: index + 1, // Assign rank (1-based)
        name: user.email, // Store email instead of name
        calories: user.calories.toFixed(2) // Format calories
    }));

  return (
    <div className="w-full h-full max-w-lg mx-auto bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg text-white">
      <h2 className="text-2xl font-bold text-center mb-4">
        🔥 Daily Leaderboard
      </h2>

      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.rank}
            className={`hover:text-white cursor-pointer  flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 transition transform hover:scale-105 ${
              user.rank === 1 ? "bg-gradient-to-r from-yellow-500 to-yellow-200 text-black" : ""
            } ${user.rank === 2 ? "bg-gradient-to-r from-red-300 to-blue-800 text-black" : ""} ${
              user.rank === 3 ? "bg-gradient-to-r from-orange-400 to-orange-100 text-black" : ""}`}
          >
            {/* Rank Badge */}
            <div className="flex items-center space-x-3">
              <span
                className={`w-10 h-10 flex items-center justify-center text-lg font-bold rounded-full ${
                  user.rank === 1
                    ? "bg-yellow-600 text-white"
                    : user.rank === 2
                    ? "bg-gray-300 text-white"
                    : user.rank === 3
                    ? "bg-amber-600 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                {user.rank}
              </span>
              <p className="text-lg font-semibold mr-8">{user.name}</p>
            </div>

            {/* Calories Burnt */}
            <div className="flex items-center space-x-2">
              <FaFire className="text-red-500 animate-pulse" />
              <p className="text-lg font-bold">{user.calories} kcal</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
