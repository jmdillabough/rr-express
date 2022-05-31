import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../model/User.js'
import Profile from '../model/Profile.js'

// Create token from JWT
const createToken = (id) => {
	return jwt.sign({id}, process.env.JWT_SECRET, {
		expiresIn: '14d'
	})
}

// Register a new user
// @route		POST api/user
// @access	Public
const registerUser = async (req, res) => {
	const {email, username, password} = req.body

	if (!username || !email || !password) {
		res.status(400).json({err: 'Please properly fill out all fields'})
		return
	}

	const userExists = await User.findOne({email})
	if (userExists) {
		res.status(400).json({err: 'User is already registered'})
		return
	}

	// Hashing password
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt)

	const user = await User.create({
		username,
		email,
		password: hashedPassword
	})

	if (user) {
		res.status(201).json({
			_id: user.id,
			username: user.username,
			email: user.email,
			token: createToken(user._id)
		})
		console.log(user)
	} else {
		res.status(400).jsopn({err: 'Invalid data'})
		return
	}
}

// Authenticate / Login a user
// @route  POST api/user/login
// @access Public
const loginUser = async (req, res) => {
	const {email, password} = req.body

	const user = await User.findOne({email})

	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user.id,
			username: user.username,
			email: user.email,
			token: createToken(user._id)
		})
	} else {
		res.status(400).json({err: 'Invalid data'})
	}
}

const userMovieList = async (req, res) => {
	const {email} = req.body
	const user = await findOne({email})

	if (user) {
		res.send(user)
	}
}

// Get Logged in User's data
// @route		api/user/me
// Protected route
const getCurrentUser = async (req, res) => {
	res.send(req.user)
}

// Create || Update User Profile
// @route api/user/profile
// Protected route
const editProfile = async (req, res) => {
	const {website, description} = req.body

	const profileParams = {}
	if (website) profileParams.website = website
	if (description) profileParams.description = description

	try {
		let profile = await Profile.findOneAndUpdate(
			{user: req.user.id},
			{$set: profileParams},
			{new: true, upsert: true, setDefaultsOnInsert: true}
		)
		return res.json(profile)
	} catch (err) {
		console.error(err.message)
		return res.status(500).send('Server Error')
	}
}

// Get all profiles
// @route api/users/profile
// Unprotected route
const getAllProfiles = async (req, res) => {
	try {
		const profile = await Profile.find().populate('user', ['username'])
		res.json(profile)
	} catch (err) {
		console.log(err.message)
		res.status(500).send('Error getting all profiles')
	}
}

export {
	registerUser,
	loginUser,
	getCurrentUser,
	userMovieList,
	editProfile,
	getAllProfiles
}
