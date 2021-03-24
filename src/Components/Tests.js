import {useContext, useEffect, useState} from 'react';
import {UserContext} from '../context/UserContext';
import {GameContext} from '../context/GameContext';
import {Redirect, useHistory} from 'react-router-dom';
import GameIcon from './GameIcon';
import axios from 'axios';

const Tests = () => {
    const userValue = useContext(UserContext);
    const gameContext = useContext(GameContext);
    const [games, setGames] = useState([]);

    const history = useHistory();
    useEffect(() => {
        axios.get('/api/games').then(res => {
            console.log(res.data)
            setGames(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])
    
    if(!userValue.user.username){
        return <Redirect to='/'/>
    }


    const loadGame = (id, name) => {
        //load game into context
        console.log(id, name);
        gameContext.setGame({game_id: id, game_name: name});
        history.push(`/game/${name.toLowerCase()}`);
    }

    return (
        <div className='games'>
            <section className='category-list'>
                {/* categories*/}
                <label><input className="searchBar" type="text" /><button>search</button></label>
                {games.map((el, i) => {
                    return <li className='categories-item' key={i} onClick={() => loadGame(el.id, el.name)}>{el.name}</li>
                })}
            </section> 
            <section className='games-list'>
                <GameIcon/>
                <GameIcon/>
                <GameIcon/>
                <GameIcon/>
                <GameIcon/>
                <GameIcon/>
            </section>
        </div>
    )
}

export default Tests
