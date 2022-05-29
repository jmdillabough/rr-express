import jwt from 'jsonwebtoken'
import User from '../model/User.js'

const authRoute = async (req, res, next) => {
	let token
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1]

			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			req.user = await User.findById(decoded.id).select('-password')

			next()
		} catch (err) {
			console.log(err)
			res.status(401).json({err: 'Unauthorized'})
		}
	}

	if (!token) {
		res.status(401).json({err: 'No token for this user'})
	}
}

export default authRoute
