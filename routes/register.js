import express from 'express'
const router = express.Router()

router.get('/', async (req, res) => {
	// this needs to get pushed to MongoDB
	let tempUser = req.oidc.user
	res.json(tempUser)
})

export default router
