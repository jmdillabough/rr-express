import express from 'express'
const router = express.Router()

import authRoute from '../middleware/authMiddleware.js'
import {
	registerUser,
	loginUser,
	getCurrentUser,
	userMovieList,
	editProfile
} from '../controllers/userController.js'

router.post('/', registerUser)
router.post('/login', loginUser)
router.route('/me').get(authRoute, getCurrentUser)
router.post('/db', userMovieList)
router.post('/profile', authRoute, editProfile)

export default router
