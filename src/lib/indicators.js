const EventEmitter = require('events')
const util = require('util')

class Indicators extends EventEmitter {
    constructor(indicators) {
        super()
        this.watch = Object.assign({}, indicators)
        // this.setWatcher = this.setWatcher.bind(this)
    }

    setWatcher(indicators) {
        let propDefine = {}
        Object.keys(indicators).forEach((key) => {
            this.watch[key] = indicators[key]
            propDefine[key] = {
                set(value) {
                    this.emit(indicators[key], value)
                    this[`_${key}`] = value
                },
                get() {
                    return this[`_${key}`]
                },
                enumerable: true
            }
        })
    }
}

module.exports = Indicators
