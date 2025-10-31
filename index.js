const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')

const pack = require('./package.json')

const { PORT } = require('./config.js')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, { /* options */ })

app.use(express.static('public'))

const v1 = new express.Router()

v1.get('/', (_, res) => res.json({
  name: pack.name, version: pack.version
}))

app.use('/api/v1', v1)

io.on('connection', (socket) => {
  socket.on('data', data => {
    console.log('data', { data })
  })
})

httpServer.listen(PORT, () => console.log(`PORT: ${PORT}`))
