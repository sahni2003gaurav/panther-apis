require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

const app = express()

mongoose.connect(url)
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use(express.json())

const UserRouter = require('./routes/Users')
app.use('/Users',UserRouter)

const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log('Server started...')
})

app.get('/',async(req,res) => {
    res.json('Hello Server:'+port)
})

module.exports = app;