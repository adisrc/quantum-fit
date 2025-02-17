import { User } from '../models/userSchema.js'

export const Register = async (req, res)=>{
     try {
        const {userId, email} = req.body;
        console.log(req.body)

        let user = await User.findOne({userId});
        console.log(user)
        if(!user){ 
             user =  await User.create( {userId:userId, email})
        }
        return res.status(200).json({
            message: "user send successfully",
            user,
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}

// export const Register = async (req, res) => {
//     try {
//       const { userId, email } = req.body;
//       console.log(req.body);
  
//       let user = await User.findOne({ userId });
  
//       if (!user) {
//         user = await User.create({ userId, email });
//       }
  
//       return res.status(200).json({
//         message: "User data fetched successfully",
//         user,
//         success: true,
//       });
//     } catch (error) {
//       console.error("Error in Register:", error);
//       res.status(500).json({ message: "Server error", success: false });
//     }
//   };


export const Workout = async (req, res) => {
    try {
        const { userId, workoutType, reps, duration } = req.body;
        console.log("Received Workout Data:", req.body);

        let user = await User.findOne({ userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Creating a new workout session
        const newWorkout = {
            workoutType,
            reps,
            duration,
        };
       user.workouts.push(newWorkout);

        user.totalReps += reps;

        // Update streak (if this is a new day)
        const lastWorkoutDate = user.workouts.length > 1 ? user.workouts[user.workouts.length - 2].timestamp : null;
        const today = new Date().setHours(0, 0, 0, 0);
        if (!lastWorkoutDate || new Date(lastWorkoutDate).setHours(0, 0, 0, 0) !== today) {
            user.streak += 1;
        }

        // Update best performance
        if (!user.bestPerformance || reps > user.bestPerformance.reps) {
            user.bestPerformance = { workoutType, reps };
        }

        await user.save();

        return res.status(200).json({ 
            message: "Workout added successfully",
             user,
              success: true });
    } catch (error) {
        console.error("Error updating workout:", error);
        res.status(500).json({ message: "Internal Server Error", error, success: false });
    }
};
export const updataWtHt = async (req, res)=>{
       try {
        console.log(req.body)
        const {userId, weight, height } = req.body;
          let user = await User.findOne({userId})
          if(!user){
             return res.status(401).json({
                 message: "user not found...",
                 success : false
             })
          }
         user =  await User.findOneAndUpdate({userId}, { $set: { weight: weight, height: height } })
         console.log(user)
          return res.status(200).json({
              message: "heights and weights added successfully...",
              success: true,
              user
          })
       } catch (error) {
         console.log(error)
       }
}

export const getWorkoutByType = async (req, res) => {
    try {
        const { userId, workoutType } = req.body; 

        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        const workout = user.workouts.filter(w => w.workoutType === workoutType);
        if (workout.length === 0) {
            return res.status(404).json({
                message: "Workout not found",
                success: false
            });
        }
        return res.status(200).json({
            message: `${workoutType} workout found`,
            success: true,
            workout
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
};
