import express from 'express'
import { challengeScorecard, addUserToChallenge } from '../controllers/challengeController.js'

const router = express.Router()
router.route('/scorecard').post(challengeScorecard);
router.route('/addUserToChallenge').post(addUserToChallenge);

export default router