const express = require('express')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth-routes')
const errorHandler = require('./middleware/error-handler')

dotenv.config()

const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT

app.use(express.json())
app.use('/auth', authRoutes)
app.use(errorHandler)

mongoose.connect(process.env.DB_CONNECTION)
    .then(console.log(`[server]: Database connected`))

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})