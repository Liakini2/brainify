import {useContext, useEffect} from 'react'
import {UserContext} from '../context/UserContext'
import {Redirect} from 'react-router-dom'
import GameIcon from './GameIcon'
import Stat from './Stat'
import {Radar} from 'react-chartjs-2'
import axios from 'axios';

const Home = ({...props}) => {
    const userValue = useContext(UserContext)
    // console.log(userValue)
    // console.log(props)

    useEffect(() => {
        axios.get('/api/scores').then(res => {
            console.log(res.data);
        }).catch(err => console.log(err));
    }, [])
    
    if(!userValue.user.username){
        return <Redirect to='/'/>
    }

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

export default Home
