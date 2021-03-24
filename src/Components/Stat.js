// import {useContext, useEffect} from 'react'
// import axios from 'axios'
import {HorizontalBar} from 'react-chartjs-2'

const Stat = () => {
    return (
        <section className='stat'>
            <HorizontalBar
            height={"50%"}
            width={"100%"}
            data={{
                datasets: [{
                    barPercentage: 1.0, 
                    barThickness: 30,
                    // score goes here 
                    data: [25],
                    
                }]
            }}
            options={{
                maintainAspectRatio: false,
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
