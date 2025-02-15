import express from 'express'
import {Register, Workout} from '../controllers/userController.js'

const router = express.Router()
router.route('/user').post(Register)
router.route('/workout').post(Workout)


export default router