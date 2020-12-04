'use strict'
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./components/routes/user.route')
const bodyParser =require('body-parser')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.use(router)

app.listen(port, () => {
    console.log('Ready to rage on ', port)
})