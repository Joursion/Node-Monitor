const http = require('http')
const fs = require('fs')
const path = require('path')
const socket = require('socket.io')

// const staticPath = path.join(__dirname, '../../assets')

// const server = http.createServer((req, res) => {
//     let url = req.url

//     switch(url) {
//         case '/': {
//             res.writeHead(200, {'Content-Type': 'text/html'})
//             getStaticFileStream('/index.html', (err, stream) => {
//                 if(err) {
//                     res.writeHead(404)
//                     return res.end('not Found')
//                 }
//             })
//         }
//     }
// })

// const getStaticFileStream = (url, cb) => {
//     let filePath = path.join(staticPath, url)
//     fs.stat(filePath, (err, stats) => {
//         if(err) {
//             return cb(err)
//         }
//         cb(null, fs.createReadStream(filePath))
//     })
// }

// const io = socket(server)

// module.exports = {
//     io,
//     httpServer: server
// }


const express = require('express')
const app = express()

app.use(express.static('public'))

app.route('/')
.get((req, res) => {
    res.sendFile('index.html')
})

const server = require('http').createServer(app)
const io = require('socket.io')(server)

module.exports = {
    io,
    server
}
