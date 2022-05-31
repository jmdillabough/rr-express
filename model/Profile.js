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
		description: {
			type: String
		},
		website: {
			type: String
		}
	})
)

export default Profile
