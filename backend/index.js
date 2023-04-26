const express = require('express')
const cors = require("cors");
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth-routes')
const errorHandler = require('./middleware/error-handler')
const corsOptions = require('./config/corsOptions');

dotenv.config()

const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT

app.use(express.json())
app.use(cors(corsOptions));
app.use('/auth', authRoutes)
app.use(errorHandler)

mongoose.connect(process.env.DB_CONNECTION)
    .then(console.log(`[server]: Database connected`))

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})