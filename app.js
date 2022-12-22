 require('dotenv').config()
const port = process.env.WEBAPI_PORT || 5000
const cors = require('cors')
const express = require('express')
const app = express()
const initMongoDB = require('./mongodb')

// middleware       system -> middleware -> app
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// // Routes/controllers
const productsController = require('./controllers/productsController')
app.use('/api/products', productsController)


initMongoDB()
app.listen(port, () => console.log(`Web Api is running om http://localhost:${port}`))