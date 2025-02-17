import express from 'express'
import {Register, Workout, updataWtHt} from '../controllers/userController.js'

const router = express.Router()
router.route('/user').post(Register)
router.route('/workout').post(Workout)
router.route('/updateWtHt').post(updataWtHt)


export default router