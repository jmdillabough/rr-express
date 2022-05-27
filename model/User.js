import mongoose from 'mongoose'
const {Schema, model} = mongoose

const userModel = mongoose.model(
	'User',
	new Schema({
		username: {
			type: String,
			required: true,
			unique: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		}
	})
)

export default userModel
