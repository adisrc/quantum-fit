import { Challenge } from "../models/challengeSchema.js";

export const challengeScorecard = async (req, res) => {
    try {
        console.log(req.body)
        const { workOutType } = req.body;
        if (!workOutType) {
            return res.status(400).json({
                message: "Workout type is required..",
                success: false
            });
        }
        // 1->with precsion of today's date and workOutType
        // const startOfDay = new Date();
        // startOfDay.setHours(0, 0, 0, 0);
        // const endOfDay = new Date();
        // endOfDay.setHours(23, 59, 59, 999);

        // const todayScorecard = await Challenge.find({
        //     challengeType: workOutType,
        //     "participants.joinedAt": { $gte: startOfDay, $lte: endOfDay }
        // }).populate("participants.user", "name email");

        // 2-> with todayWorkOutType
                   // const todayData = todayScorecard.filter((data)=> data.workOutType === workOutType && createdAt < Date.now())
        //  const todayScorecard = await Challenge.find({ workOutType});

        // 3-> everything  frontend will handle it
        const todayScorecard = await Challenge.find({});

        //console.log(todayScorecard)

        if (!todayScorecard.length) {
            return res.status(400).json({
                message: "no user participated in challenge today...",
                sucess: false
            })
        }
        return res.status(200).json({
            message: "all users of today challenge",
            todayScorecard,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}
export const addUserToChallenge = async (req, res) => {
    try {
        console.log(req.body)
        const { username, userId, workOutType, duration, reps } = req.body;

        const userData = await Challenge.create({ username, userId, workOutType, duration, reps })
        await userData.save();
        if (!userData) {
            return res.status(400).json({
                message: "error in adding data",
                success: false
            })
        }

        return res.status(201).json({
            message: "Thank you for your participation to this challenge",
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}