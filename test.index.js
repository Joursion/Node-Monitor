const express = require('express')
const memeye = require('./index.js')


memeye()
console.log('memeye', memeye)

const app = express()
app.get('/', (req, res) => {
    res.end('hello world');
})
app.listen(5040, (err)=> {
    if(err) {
        console.error('err',err)
    }
    console.log('listening')
})