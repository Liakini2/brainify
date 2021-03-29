import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/UserContext'
import {GameContext} from '../context/GameContext';
import {useHistory} from 'react-router-dom';
import GameIcon from './GameIcon'
import Stat from './Stat'
import axios from 'axios';
import ForwardIcon from '@material-ui/icons/Forward';


const Home = ({...props}) => {
    const history = useHistory()
    const userValue = useContext(UserContext)
    const gameContext = useContext(GameContext);

    const [index, setIndex] = useState(0);

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
            <h1>Welcome {userValue.user.first_name}! </h1>
            <h2>We recommend these games</h2>
            <section className='home-content'>
                <section className="recommended computer">
                    {userValue.recommended.map((el, i) => {if(el) return <GameIcon info={el} loadgame={loadGame} />})}
                </section>
                <section className="recommended phone">
                    <ForwardIcon className="left" onClick={_ => {
                        if(index === 0) { setIndex(userValue.recommended.filter(el => el).length-1)} else {setIndex(index-1)}
                    }}/>
                        {userValue.recommended[index] && <GameIcon info={userValue.recommended[index]} loadgame={loadGame} />}
                    <ForwardIcon className="right" onClick={_ => {
                        if(index === userValue.recommended.filter(el => el).length-1) { setIndex(0)} else {setIndex(index+1)}
                    }}/>
                </section>
                <section className='stats'>
                    <Stat />
                </section>
            </section>
        </div>
    )
}

export default Home
