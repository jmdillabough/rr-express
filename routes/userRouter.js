import express from 'express'
const router = express.Router()

import authRoute from '../middleware/authMiddleware.js'
import {
	registerUser,
	loginUser,
	getCurrentUser,
	userMovieList
} from '../controllers/userController.js'

router.post('/', registerUser)
router.post('/login', loginUser)
router.route('/me').get(authRoute, getCurrentUser)
router.post('/db', userMovieList)

export default router
