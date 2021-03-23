import {Switch, Route} from 'react-router-dom';
import SpeedMatch from './Speed/SpeedMatch';

const GameLoader = (props) => {

    return <div className="game">
        <Switch>
        
        <Route path='/game/speedmatch' component={SpeedMatch} />
    </Switch>
    </div>
}

export default GameLoader;