const http = require('http')
const { mongoConnect } = require('./services/mongo')
require('dotenv').config()

const app = require('./app')

const port = process.env.PORT || 3000

const server = http.createServer(app)

async function startServer() {
    try {
        await mongoConnect()
        server.listen(port, () => {
        console.log(`Server is running on port ${port}`)
        })
    } catch (error) {
        console.error(error)
    }
}
    
startServer()