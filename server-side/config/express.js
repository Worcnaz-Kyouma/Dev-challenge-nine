const express = require('express')
const cors = require('cors')

function createServer(){
    const server = express()

    server.use(express.json())
    server.use(cors())

    return server;
}

module.exports = createServer();

