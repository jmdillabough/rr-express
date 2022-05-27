import express from 'express'
const router = express.Router()

// User Controller
import {
	registerUser,
	loginUser,
	getCurrentUser
} from '../controllers/userController.js'

router.post('/', registerUser)

router.post('/login', loginUser)

router.get('/me', getCurrentUser)

export default router
