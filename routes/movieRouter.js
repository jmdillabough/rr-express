import fetch from 'node-fetch'
import express from 'express'
const router = express.Router()

import authRoute from '../middleware/authMiddleware.js'
import {
	getMovieById,
	getNowPlaying,
	getPopularMovies
} from '../controllers/movieController.js'

const url = 'https://api.themoviedb.org/3/'

router.route('/now_playing').get(authRoute, getNowPlaying)
router.route('/').get(authRoute, getPopularMovies)
router.route('/:id').get(getMovieById)

export default router
