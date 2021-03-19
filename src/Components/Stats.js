import React from 'react'
import Stat from './Stat'
import {Radar} from 'react-chartjs-2'

const Stats = () => {
    return (
        <div className='your-stats'>
            <Stat/>
            <section className='overview'>
                <Radar
                height={"25%"}
                width={"25%"}
                options={{
                    maintainAspectRatio: false
                }}
                data={{
                    //categories go here
                    labels: ['Memory', 'Speed', 'Math'], 
                    datasets:[{
                        label: `score`,
                        // user scores go here
                        data: [50, 100, 10]
                    }],
                    backgroundColor: [
                        "rgba(201, 249, 255, 0.75)",
                        "rgba(144, 215, 255, 0.75)",
                        "rgba(201, 249, 255, 0.75)"
                    ]
                }}
                options={{
                    scale: {
                        ticks: {
                            suggestedMin: 10,
                            suggestedMax: 100
                        }
                    }
                }}
                />
            </section>
        </div>
    )
}

export default Stats
