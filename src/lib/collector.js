const v8 =  require('v8')
const os = require('os')
const logger = require('./logger.js')

class Collector {
    constructor(dashboard, {frequency = 1000}) {
        this.dashboard = dashboard
        this.interval = null
        this.frequency = frequency
    }

    stop() {
        clearInterval(this.interval)
    }

    start() {
        if(this.interval) {
            console.error('Collector has been started')
            return
        }

        this.interval = setInterval(() => {
            let processStat = process.memoryUsage()
            let v8Stat = {
                heap: v8.getHeapSpaceStatistics(),
                heapSpace: v8.getHeapSpaceStatistics(),
            }
            let osStat = {
                freeMem: os.freemem(),
                totalMem: os.totalmem(),
                cpus: os.cpus(),
            }
            let data = [
                {
                    type: 'process',
                    value: processStat,
                },
                {
                    type: 'v8',
                    value: v8Stat,
                },
                {
                    type: 'os',
                    value: osStat
                }
            ]

            if(this.dashboard && this.dashboard.connected) {
                this.dashboard.send(data)
            }

            if(logger.level >= logger.levelMap['debug']) {
                logger.debug(`Collector heartbeat, data collected. --size: ${Buffer.from(JSON.stringify(data)).length}, timestamp: ${Date.now()}`)
            }
        }, this.frequency)
    }
}

module.exports = Collector;