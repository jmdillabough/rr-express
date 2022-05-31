import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {connectDB} from './db/mongodb.js'
dotenv.config()

// Routes
import movieRouter from './routes/movieRouter.js'
import userRouter from './routes/userRouter.js'

const app = express()
const PORT = process.env.PORT || 3001
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

connectDB()

app.get('/', (req, res) => {
	res.json({msg: 'Hello'})
})

app.use('/api/movies', movieRouter)
app.use('/api/user', userRouter)

app.listen(PORT, () => {
	console.log(`Server is running on port http://localhost:${PORT}`)
})
