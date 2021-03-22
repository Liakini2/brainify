import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/UserContext'
import {Redirect} from 'react-router-dom'
import GameIcon from './GameIcon'
import axios from 'axios'

const Tests = () => {
    const userValue = useContext(UserContext)
    const [games, setGames] = useState([]);
    useEffect(() => {
        axios.get('/api/games').then(res => {
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
    }

    return (
        <div className='games'>
            <section className='category-list'>
                {/* categories*/}
                <label><input type="text" /><button>search</button></label>
                {games.map((el, i) => {
                    <li key={i} onClick={loadGame(el.id, el.name)}>{el.name}</li>
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
