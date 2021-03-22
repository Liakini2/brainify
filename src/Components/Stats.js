import {useContext} from 'react'
import {UserContext} from '../context/UserContext'
import {Redirect} from 'react-router-dom'
import Stat from './Stat'
import {Radar} from 'react-chartjs-2'

const Stats = () => {
    const userValue = useContext(UserContext)

    if(!userValue.user.username){
        return <Redirect to='/'/>
    }
    
    return (
        <div className='your-stats'>
            <Stat/>
            <section className='overview'>
                <Radar
                height={"25%"}
                width={"25%"}
                data={{
                    //categories go here
                    labels: ['Memory', 'Speed', 'Math'], 
                    datasets:[{
                        label: `score`,
                        // user scores go here
                        data: [50, 100, 20]
                    }],
                    backgroundColor: [
                        "rgba(201, 249, 255, 1)",
                        "rgba(144, 215, 255, 1)",
                        "rgba(201, 249, 255, 0.75)"
                    ]
                }}
                options={{
                    maintainAspectRatio: false,
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
