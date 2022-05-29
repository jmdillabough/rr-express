import mongoose from 'mongoose'
const {Schema, model} = mongoose

const Profile = mongoose.model(
	'Profile',
	new Schema({
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		id: {
			type: Number,
			index: {
				unique: true
			}
		},
		original_title: {
			type: String
		},
		year: {
			type: Number
		}
	})
)

export default Profile
