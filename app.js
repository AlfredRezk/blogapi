const express = require('express')
const connectDB = require('./utils/connectDB')
require('dotenv').config()
const logger = require('morgan')
require('colors')

// read env variables
const PORT = process.env.PORT ?? 8080
const HOST = process.env.HOST || 'http://localhost'

// create express app
const app = express()

// Middlewares
app.use(express.json())
app.use(logger('dev'))

// Connec to DB
connectDB(process.env.MONGODB_URI)

app.all('/', (req, res) => {
  res.send('Welcome to Blog API Project')
})

// Routes
app.use('/api/posts', require('./routes/post.routes'))

// Express ErrorHandler
app.use(require('./middlewares/errorHandler'))

// Run server
app.listen(PORT, () => {
  console.log(`Server running at ${HOST}:${PORT}`.bgGreen)
})
