const express = require('express')
const authRouter = require('./auth/users.router')

const apiV1Router = express.Router()

apiV1Router.use('/auth', authRouter)

module.exports = apiV1Router
