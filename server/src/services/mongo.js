const mongoose = require('mongoose')
require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL

async function mongoConnect() {
    try {
        await mongoose.connect(MONGO_URL, {})
        console.log('MongoDB connected')
    } catch (error) {
        console.error(error)
    }
}

async function mongoDisconnect() {
    try {
        await mongoose.disconnect()
        console.log('MongoDB disconnected')
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}