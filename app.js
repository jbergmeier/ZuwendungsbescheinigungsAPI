const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const fetch = require("node-fetch")

const PORT = process.env.PORT || 3000
const event = new Date()
const options = { year: 'numeric', month: 'numeric', day: 'numeric' }; // weekday: 'long'
const curDate = event.toLocaleDateString('de-DE', options)

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// API Routes
app.post('/api/v3/de/generate', (req, resp, next) => {
    try {
        let responseBody = {}
        
        "donatedAmount" in req.body ? donatedAmount = req.body.donatedAmount : (function() {throw new Error("Key issue: donatedAmount is missing")}())
        "donationDate" in req.body ? donationDate = req.body.donationDate : (function() {throw new Error("Key issue: donationDate is missing")}())
        "donorFirstname" in req.body ? donorFirstname = req.body.donorFirstname : (function() {throw new Error("Key issue: donorFirstname is missing")}())
        "donorLastname" in req.body ? donorLastname = req.body.donorLastname : (function() {throw new Error("Key issue: donorLastname is missing")}())
        "donorStreet" in req.body ? donorStreet = req.body.donorStreet : (function() {throw new Error("Key issue: donorStreet is missing")}())
        "donorHousenumber" in req.body ? donorHousenumber = req.body.donorHousenumber : (function() {throw new Error("Key issue: donorHousenumber is missing")}())
        "donorPostalCode" in req.body ? donorPostalCode = req.body.donorPostalCode : (function() {throw new Error("Key issue: donorPostalCode is missing")}())
        "donorPostalPlace" in req.body ? donorPostalPlace = req.body.donorPostalPlace : (function() {throw new Error("Key issue: donorPostalPlace is missing")}())

        console.log(donatedAmount)
        const floorAmount = Math.floor(donatedAmount)
        responseBody.currentDate = curDate

        fetch(process.env.FIGURETOTEXT_BASEURL + floorAmount)
        .then(res => res.json())
        .then(res => {
            // Request Modifications for futher calc and res
            responseBody.requestfullAmount = floorAmount
            responseBody.amountText = res.germanText
            resp.json(responseBody)
        })
        
    }
    catch(err) {
        try {
            resp.status(400).json({
            message: "An error has occured",
            error: err.message
        })
        } catch (error) {
            next(error)
        }
        
    }

})


// API - Error Handling Basic
app.use((err, req, res, next) => {
    console.error('StackTrace: ' + err.stack);
    console.log("Error-MSG: ", res)
    res.status(500).json({
      message: 'An error has occured!',
      stack: process.env.NODE_ENV == 'development' ? err.stack : 'n/a',
    });
  });


// Start Server
app.listen(PORT,() => {
    console.log(`Server is running on port: ${PORT}`)
})