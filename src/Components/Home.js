import React from 'react'
import GameIcon from './GameIcon'
import Stat from './Stat'
import {Radar} from 'react-chartjs-2'

const Home = () => {
    return (
        <div className='home'>
            <section className='recommended'>
                <h1>Recommended For You</h1>
                <section>
                    <GameIcon/>
                    <GameIcon/>
                    <GameIcon/>
                    <GameIcon/>
                    <GameIcon/>
                    <GameIcon/>
                </section>
            </section>
            <section className='stats'>
                <h1>Your Recent Stats</h1>
                <Stat />
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
                        data: [50, 100, 20]
                    }],
                    backgroundColor: [
                        "rgba(201, 249, 255, 1)",
                        "rgba(144, 215, 255, 1)",
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

export default Home
