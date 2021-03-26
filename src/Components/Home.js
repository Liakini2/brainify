import {useContext, useEffect} from 'react'
import {UserContext} from '../context/UserContext'
import {GameContext} from '../context/GameContext';
import {useHistory} from 'react-router-dom';
import GameIcon from './GameIcon'
import Stat from './Stat'
import axios from 'axios';


const Home = ({...props}) => {
    const history = useHistory()
    const userValue = useContext(UserContext)
    const gameContext = useContext(GameContext);

    useEffect(() => {
        axios.get('/auth/me')
        .then(({data})=>{
            userValue.setUser(data)
            userValue.getRecommendedGames()
        })
        .catch(_=>history.push('/'))
    }, [])

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
                <Stat />
            </section>
        </div>
    )
}

export default Home
