import fetch from 'node-fetch'

const baseUrl = `https://api.themoviedb.org/3/movie/`
const url = 'https://api.themoviedb.org/3/'

// Get Popular Movies
// @route api/movies
const getPopularMovies = async (req, res) => {
	let page;
	if (req.query.page && req.query.page > 0) {
		page = req.query.page
	} else {
		page = 1
	}
	try {
		const results = await fetch(
			`${baseUrl}popular?api_key=${process.env.TMBD_API}&page=${page}`
		)
		const data = await results.json()
		res.send(data)
	} catch (err) {
		console.log(err)
		res.status(500).send('An error occured fetching your data')
	}
}

// GET movies playing now
// @route api/movies/now_playing
const getNowPlaying = async (req, res) => {
	let page;
	if (req.query.page && req.query.page > 0) {
		page = req.query.page
	} else {
		page = 1
	}
	try {
		const results = await fetch(
			`${baseUrl}now_playing?api_key=${process.env.TMBD_API}&page=${page}`
		)
		const data = await results.json()
		res.json(data)
	} catch (error) {
		console.log(error)
		res.status(500).send('An error occured fetching your data')
	}
}

const tmdbTopRated = async (req, res) => {
	let page;
	if (req.query.page && req.query.page > 0) {
		page = req.query.page
	} else {
		page = 1
	}
	try {
		const results = await fetch(`${baseUrl}top_rated?api_key=${process.env.TMBD_API}&page=${page}`)
		const data  = await results.json()
		res.json(data)
	} catch (err) {
		res.status(500).json({err: "An error occured fetching top rated films"})
	}
}

// Get movie by ID (i.e., Ad Astra = 419704)
// route api/movies/:id
const getMovieById = async (req, res) => {


	const result = await fetch(
		`${url}/movie/${req.params.id}?api_key=${process.env.TMBD_API}`
	)
	const data = await result.json()
	

	res.json(data)
}

export {getPopularMovies, getNowPlaying, getMovieById,tmdbTopRated}
