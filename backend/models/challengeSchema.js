import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  workOutType: {
    type: String,
    required: true,
  },
  duration:{
    type: Number,
    required: true
  },
  reps:{
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Challenge = mongoose.model('Challenge', challengeSchema);
