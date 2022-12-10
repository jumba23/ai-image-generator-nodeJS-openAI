const express = require('express')
const dotenv = require('dotenv').config()
const generateAiImage = require('./routes/openaiRoutes')
const port = process.env.PORT || 5000

const app = express()

app.use('/openai', generateAiImage)

app.listen(port, () => console.log(`Server started on port ${port}`))