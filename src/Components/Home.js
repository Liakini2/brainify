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

    if(!userValue.user.username){
        return <Redirect to='/'/>
    }

    return (
        <div className='home'>
            <section className='recommended'>
                <h1>Welcome {userValue.user.first_name}! Recommended For You</h1>
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
                <Stat />
            </section>
        </div>
    )
}

export default Home
