import React from 'react'
import {HorizontalBar} from 'react-chartjs-2'

const Stat = () => {
    return (
        <section className='stat'>
            <HorizontalBar
            height={"50%"}
            width={"100%"}
            options={{
                maintainAspectRatio: false
            }}
            data={{
                datasets: [{
                    barPercentage: 1.0, 
                    barThickness: 30,
                    // score goes here 
                    data: [25]
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
