import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
  workoutType: {
    type: String,
    required: true, 
  },
  reps: {
    type: Number,
    required: true, 
  },
  duration: {
    type: Number, 
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
        unique: true,
      },
      height:{
        type:Number
      },
      weight:{
        type:Number
      },
      workouts: [WorkoutSchema],
      totalReps: {
        type: Number,
        default: 0, 
      },
      streak: {
        type: Number,
        default: 0, 
      },
      bestPerformance: {
        workoutType: String, 
        reps: Number, 
      },
    },
    {timestamps: true}
);
export const User =  mongoose.model("User", userSchema)

// module.exports = mongoose.model("User", UserSchema);