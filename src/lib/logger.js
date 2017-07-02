const colors = require('colors/safe')

// colors.zebra
// colors.setTheme({
//     info: 'grenn',
//     warn: 'yellow',
//     debug: 'bule',
//     error: 'red'
// })
colors.setTheme({
    info: 'green',
    warn: 'yellow',
    debug: 'blue',
    error: 'res'
})

const levelMap = {
    'error': 0,
    'warn': 1,
    'info': 2,
    'debug': 3
}

Object.freeze(levelMap)

class Logger {
    constructor(level = 2, prefix = '') {
        this.prefix = prefix
        this.levelMap = levelMap
        this.setLevel(level)
    }

    setLevel(level) {
        if (typeof level !== 'string' && typeof level !== 'number') level = 2
        if (typeof level === 'string') level = levelMap[level]
        return this.level = level
    }

    error(msg) {
        if (this.level >= levelMap['error']) {
            console.log(this.prefix + colors['error'](msg))
        }
    }

    warn(msg) {
        if (this.level >= levelMap['warn']) {
            console.log(this.prefix + colors['warn'](msg))
        }
    }
    info(msg) {
        if (this.level >= levelMap['info']) {
            console.log(this.prefix + colors['info'](msg))
        }
    }
    debug(msg) {
        if (this.level >= levelMap['debug']) {
            console.log(this.prefix + colors['debug'](msg))
        }
    }
}

module.exports = new Logger(2, '[Memeye]')