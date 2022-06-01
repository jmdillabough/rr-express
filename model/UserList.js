import mongoose from 'mongoose'
const {Schema, model} = mongoose

const userListModel = mongoose.model(
	'UserList',
	new Schema({
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		},
        title: {
            type: String
        },
		genres: {
			type: [String],
		},
        id: {
            type: Number
        },
        overview: {
            type: String
        },
        release_date: {
            type: String
        },
        vote_average: {
            type: Number
        }
	})
)

export default userListModel
