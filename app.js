const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const PORT = process.env.PORT || 3000
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// API Routes
app.post('/api/v3/de/generate', (req, res, next) => {
    try {
        console.log((req.body))
        res.status(201).json(
            req.body
        )
    }
    catch(err) {
        next(err)
    }
})


// API - Error Handling Basic
app.use((err, req, res, next) => {
    console.error('StackTrace: ' + err.stack);
  
    res.status(500).json({
      message: 'An error has occured!',
      error: 'hello',
      stack: process.env.NODE_ENV == 'development' ? err.stack : 'n/a',
    });
  });


// Start Server
app.listen(PORT,() => {
    console.log(`Server is running on port: ${PORT}`)
})