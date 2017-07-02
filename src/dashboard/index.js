const Indicator = require('../lib/indicators')
const server = require('./server')
const logger = require('../lib/logger')

const port = process.argv[2] || 2333
const indicator = new Indicator({
    //process
    rss: 'indicators:rss',
    heapTotal: 'indicators:heapTotal',
    heapUsed: 'indicators:heapUsed',

    //os
    freeMem: 'indicators:freeMem',
    totalMem: 'indicators:totalMem',
    cpus: 'indicators:cpus',

    //v8 heap space
    newSpace: 'indicators:newSpace',
    oldSpace: 'indicators:oldSpace',
    codeSpace: 'indicators:codeSpace',
    mapSpace: 'indicators:mapSpace',
    largeObjectSpace: 'indicators:largeObjectSpace'
})

//Bind process IPC channel to indicator
const bindIndicators = (indicator) =>{
    const collectorHandler = {
        process(value) {
            indicator.rss = value.rss
            indicator.heapTotal = value.heapTotal
            indicator.heapUsed = value.heapUsed
        },
        os(value) {
            indicator.totalMem = value.totalMem
            indicator.freeMem = value.freeMem
            indicator.cpus = value.cpus
        },
        v8(value) {
            indicator.newSpace = value.heapSpace[0]
            indicator.oldSpace = value.heapSpace[1]
            indicator.newSpace = value.heapSpace[0]
            indicator.newSpace = value.heapSpace[0]
            indicator.newSpace = value.heapSpace[0]
        }
    }

    process.on('message', (msg) => {
        if (Array.isArray(msg)) {
            msg.forEach((data) => {
                let handler = collectorHandler[data.type]
                typeof handler === 'function' && collectorHandler[data.type](data.value)
            })
        }
    })
}

//Bind indicators to socket 
const bindSocket = (io, indicator) => {
    Object.keys(indicator.watch).forEach((key) => {
        let eventName = indicator.watch[key]
        indicator.on(eventName, (msg) => {
            io.emit(eventName, msg)
        })
    })
}

logger.info('Binding Indicator with Collector by IPC channel...')
bindIndicators(indicator)

logger.info('Binding Indicator with Socket.io...')
bindSocket(server.io, indicator)

server.server.listen(port, () => {
    logger.info(`Memeye running on : http://localhost:${port}`)
})