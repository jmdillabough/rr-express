import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import User from '../model/User.js'

// Authenticate a user
// @route  POST api/user/login
// @access Public
const loginUser = async (req, res) => {
	res.send({message: 'Login'})
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
		res.status(201).json({user})
	} else {
		res.status(400).jsopn({err: 'Invalid data'})
		return
	}
}

// Get Logged in User's data
// @route		api/user/me
// @access	Public
const getCurrentUser = async (req, res) => {
	const user = await User.findOne({email: 'jdillabough87@gmail.com'})
	if (user) {
		res.status(400).json({user})
		return
	}
}

export {registerUser, loginUser, getCurrentUser}
