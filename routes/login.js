import express from 'express'
import User from '../model/User.js'
const router = express.Router()

router.post('/', async (req, res) => {
	if (!req.body) {
		return res.status(400).send('Request body is missing')
	}
	const {username, email, password} = req.body
	try {
		let user = await User.findOne({email: email})

		if (user) {
			return res.status(400).json({err: 'User already exists'})
		}
		user = new User({username, email, password})
		await user.save()
		res.json(user)
	} catch (err) {
		console.log(err.message)
		res.status(500).send('Error')
	}
})

export default router
