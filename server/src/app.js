const path = require('path')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const session = require('express-session')
require('dotenv').config()

const apiV1Router = require('./routes/apiV1')

const app = express()

app.use(helmet())
app.use(cors({
    origin: '*'
}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto',
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
}))

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))


app.use('/api/v1', apiV1Router)
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app