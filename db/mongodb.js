import mongoose from 'mongoose'

export const connectDB = () => {
	mongoose
		.connect(process.env.MONGODB, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		.then(() => console.log('Connected to MongoDB'))
		.catch((err) => console.log(err))
}

export default connectDB
