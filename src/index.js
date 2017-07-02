const path = require('path')
const child_process = require('child_process')
const Collector = require('./lib/collector')
const logger = require('./lib/logger')

const modulePath = path.join(__dirname, './dashboard')

module.exports = function ({port = 23333, log, frequency} = {}) {
    console.warn('!!!1');
    log && logger.setLevel(log)

    logger.info('Memeye setting up....')

    let dashboardProcess = child_process.fork(modulePath, [port])

    logger.info('Initializing Collector...')

    let collector = new Collector(dashboardProcess, {frequency})
    collector.start()
    
    //If Parent process exit, kill child process
    process.on('exit', () => {
        dashboardProcess.kill()
    })

    dashboardProcess.once('error', (err) => {
        logger.error(`DashboradProcess occur an error: ${err.toString()}`)
        logger.error(`DashboardProcess should be stopping ...`)
        dashboardProcess.kill()
    }).once('exit', (code, signal) => {
        logger.error(`DashboardProcess exited by code : ${code}`)
        logger.error(`Collector has been stopped.`)
        collector.stop()
    })
}