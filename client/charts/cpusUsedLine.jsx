import {Line} from 'react-chartjs'
import React, { Component } from 'react'

const records = 100

const colorPool = [
    '#F44336',  // Red
    '#9C27B0',  // Purple
    '#2196F3',  // Blue
    '#8BC34A',  // Light Green
    '#FFC107',  // Amber
    '#CDDC39',  // Lime
    '#00BCD4',  // Cyan
]

class CpusUsedLine extends Component {
    constructor (props, context) {
        super(props, context)
        this.state = {
        }
    }

    caculateData = (cpus) =>{
        let {labels} = this.props

        let now = new Date()
        let data = {
            labels: this.props.labels,
            datasets: []
        }

        let dynamicData = {
            labels: new Array()
        }
        

        cpus.forEach((item, index) => {
            let used = computedUsed(tiem.times)
            
        })    
    }

    computedUsed = (value) => {
        let total = value.user + value.nice + value.sys + value.idle + value.irq
        let cpu = ((total - value.idle) / total) * 100
        return cpu
    }
    
    render () {
        return (
            <div>
                <Line data={this.state.data} />
            </div>
        )
    }
}

export default CpusUsedLine

CpusUsedLine.prototype = {

}
