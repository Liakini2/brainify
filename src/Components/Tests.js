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
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');
    const [catFilter, setCatFilter] = useState('');

    const history = useHistory();
    useEffect(() => {
        axios.get('/api/games').then(res => {
            console.log(res.data)
            setGames(res.data);
        }).catch(err => {
            console.log(err);
        })

        axios.get('/api/games/categories').then(res => {
            setCategories(res.data)
        }).catch(err => console.log(err))
    }, []);
    
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
        <div className='games'>
            <section className='category-list'>
                <label>Find Game: <input type="text" value={search} onChange={e => setSearch(e.target.value)}/></label>

                {/* Switch this to list of categories, game icons will be mapping over all the games. */}
                <li onClick={() =>setCatFilter('')}>All</li>
                {categories.map((el, i) => <li key={i} onClick={() => setCatFilter(el.category)}>{el.category}</li>)}
            </section> 
            <section className='games-list'>
                {games.filter(el => el.name.includes(search) && el.category.includes(catFilter)).map((el, i) => {
                    return <GameIcon key={i} loadgame={loadGame} info={el}/>
                })}
                
            </section>
        </div>
    )
}

export default Tests
