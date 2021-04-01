import {Switch, Route} from 'react-router-dom';
import {useContext, useEffect} from 'react';
import {GameContext} from '../../context/GameContext';
import {UserContext} from '../../context/UserContext';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import SpeedMatch from './Speed/SpeedMatch';
import MathDrop from './MathDrop/MathDrop';
import Memory from '../Games/Memory/Memory'
import Brainshift from '../Games/Brainshift/Brainshift';
import MemoryMatrix from '../Games/MemoryMatrix/MemoryMatrix'

const GameLoader = (props) => {

    const gameContext = useContext(GameContext);
    const userValue = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        axios.get('/auth/me')
        .then(({data})=>{
            userValue.setUser(data)
            userValue.getRecommendedGames()
        })
        .catch(_=>history.push('/'));
    }, [])

    return <div className="game">
        <Switch>
            <Route path='/game/mathdrop' component={MathDrop} />
            <Route path='/game/speedmatch'><SpeedMatch game_id={gameContext.game.game_id} game_name={gameContext.game.game_name} /></Route>
            <Route path='/game/memorycards' component={Memory}/>
            <Route path='/game/brainshift' component={Brainshift} />
            <Route path='/game/memorymatrix' component={MemoryMatrix} />
        </Switch>
    </div>
}

export default GameLoader;