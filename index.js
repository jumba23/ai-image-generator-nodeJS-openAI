const express = require('express')
const path = require('path')
const dotenv = require('dotenv').config()
const generateAiImage = require('./routes/openaiRoutes')
const port = process.env.PORT || 5000

const app = express()

// Enable body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Set static folder
app.use(express.static(path.join(__dirname, 'build')))

app.use('/openai', generateAiImage)

app.listen(port, () => console.log(`Server started on port ${port}`))