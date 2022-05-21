import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {auth} from 'express-openid-connect'
import {connectDB} from './db/mongodb.js'
dotenv.config()

// route
import indexRouter from './routes/index.js'
import loginRouter from './routes/login.js'
import movieRouter from './routes/movies.js'

// Auth0 Config
const config = {
	authRequired: false,
	auth0Logout: true,
	secret: process.env.SECRET,
	baseURL: process.env.BASEURL,
	clientID: process.env.CLIENTID,
	issuerBaseURL: process.env.ISSUER
}

const app = express()
const PORT = process.env.PORT || 3001
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(auth(config))

connectDB()

app.get('/', (req, res) => {
	res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
})

app.get('/login', (req, res) => {
	res.send('Login')
})

app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/movies', movieRouter)

app.listen(PORT, () => {
	console.log(`Server is running on port http://localhost:${PORT}`)
})
