import {useContext} from 'react'
import {UserContext} from '../context/UserContext'
import {GameContext} from '../context/GameContext';
import {Redirect, useHistory} from 'react-router-dom';
import GameIcon from './GameIcon'
import Stat from './Stat'


const Home = ({...props}) => {
    const history = useHistory()
    const userValue = useContext(UserContext)
    const gameContext = useContext(GameContext);
    // console.log(userValue)
    // console.log(props)

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
                <Stat />
            </section>
        </div>
    )
}

export default Home
