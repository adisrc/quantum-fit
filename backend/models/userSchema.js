import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
  workoutType: {
    type: String,
    required: true, // Example: "Push-ups", "Squats"
  },
  reps: {
    type: Number,
    required: true, // Count detected by AI
  },
  duration: {
    type: Number, // Time spent on workout (in seconds)
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }, 
});

const userSchema = new mongoose.Schema(
    {
      userId: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      workouts: [WorkoutSchema], // Array of workout sessions
      totalReps: {
        type: Number,
        default: 0, // Sum of all reps
      },
      streak: {
        type: Number,
        default: 0, // Consecutive days of workouts
      },
      bestPerformance: {
        workoutType: String, // Best exercise (e.g., "Push-ups")
        reps: Number, // Max reps in one session
      },
    },
    {timestamps: true}
);
export const User =  mongoose.model("User", userSchema)

// module.exports = mongoose.model("User", UserSchema);