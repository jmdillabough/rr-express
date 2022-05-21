import fetch from 'node-fetch'
import express from 'express'

const router = express.Router()

const baseUrl = `https://api.themoviedb.org/3/movie/`

// Get Popular Movies
router.get('/', async (req, res) => {
	try {
		const results = await fetch(
			`${baseUrl}popular?api_key=${process.env.TMBD_API}`
		)
		const data = await results.json()
		res.json(data)
	} catch (err) {
		console.log(err)
		res.status(500).send('An error occured fetching your data')
	}
})

// Get movies playing now
router.get('/now_playing', async (req, res) => {
	try {
		const results = await fetch(
			`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMBD_API}&page=1`
		)
		const data = await results.json()
		res.json(data)
	} catch (error) {
		console.log(error)
		res.status(500).send('An error occured fetching your data')
	}
})

export default router
