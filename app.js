import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {auth} from 'express-openid-connect'
import {connectDB} from './db/mongodb.js'
dotenv.config()

// route
import indexRouter from './routes/index.js'
import movieRouter from './routes/movies.js'
import registerRouter from './routes/register.js'

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

app.get('/profile', (req, res) => {
	res.send(JSON.stringify(req.oidc.user))
})

app.use('/', indexRouter)
app.use('/movies', movieRouter)
app.use('/register', registerRouter)

app.listen(PORT, () => {
	console.log(`Server is running on port http://localhost:${PORT}`)
})
