import {useContext, useEffect} from 'react'
import {UserContext} from '../context/UserContext'
import {GameContext} from '../context/GameContext';
import {Redirect, useHistory} from 'react-router-dom';
import GameIcon from './GameIcon'
import Stat from './Stat'
import {Radar} from 'react-chartjs-2'
import axios from 'axios';

const Home = ({...props}) => {
    const userValue = useContext(UserContext)
    const gameContext = useContext(GameContext);
    // console.log(userValue)
    // console.log(props)

    const history = useHistory();

    useEffect(() => {
        axios.get('/api/scores').then(res => {
            console.log(res.data);
        }).catch(err => console.log(err));

        
    }, [])
    
    if(!userValue.user.username){
        return <Redirect to='/'/>
    }

    const loadGame = (id, name, game_icon) => {
        //load game into context
        console.log(id, name);
        gameContext.setGame({game_id: id, game_name: name, game_icon});
        history.push(`/game/${name.toLowerCase()}`);
    }

    return (
        <div className='home'>
            <section className='recommended'>
                <h1>Welcome {userValue.user.first_name}! Recommended For You</h1>
                <section>
                    {userValue.recommended.map((el, i) => <GameIcon info={el} loadgame={loadGame} />)}
                    
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
