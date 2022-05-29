import fetch from 'node-fetch'
import express from 'express'
import authRoute from '../middleware/authMiddleware.js'

import User from '../model/User.js'
import userMovieModel from '../model/UserMovieList.js'
import router from './userRouter.js'

// Get current user's movie profile
router.get('/', authRoute, async (req, res) => {
	try {
		const profile = await userMovieModel.findOne({user: req.user.id})
		console.log(profile)
	} catch (err) {
		console.log(err)
	}
})

export default router
