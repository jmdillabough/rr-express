import express from 'express'
const router = express.Router()

import authRoute from '../middleware/authMiddleware.js'
import {
	registerUser,
	loginUser,
	getCurrentUser,
	userMovieList,
	editProfile,
	getAllProfiles
} from '../controllers/userController.js'

router.route('/me').get(authRoute, getCurrentUser)
router.get('/profile', authRoute, getAllProfiles)
router.post('/', registerUser)
router.post('/login', loginUser)
router.post('/db', userMovieList)
router.post('/profile', authRoute, editProfile)

export default router
