import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userid:{
            type:String,
            required:true
        },
        email:{
            type:String,
            unique:true
        }
    },
    {timestamps: true}
)
export const User =  mongoose.model("User", userSchema)