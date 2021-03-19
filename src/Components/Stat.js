import React from 'react'
import {HorizontalBar} from 'react-chartjs-2'

const Stat = () => {
    return (
        <section className='stat'>
            <HorizontalBar
            height={10}
            width={50}
            options={{
                maintainAspectRatio: false
            }}
            data={{
                datasets: [{
                    barPercentage: 1.0, 
                    barThickness: 30,
                    // score goes here 
                    data: [5]
                }]
            }}
            options={{
                scales: {
                    xAxes: [{
                        gridLines: {
                            offsetGridLines: false
                        }
                    }]
                }
            }}
            />
        </section>
    )
}


export default Stat
