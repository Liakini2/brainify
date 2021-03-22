import {Switch, Route} from 'react-router-dom';
import SpeedMatch from './Speed/SpeedMatch';
import MathDrop from './Math/MathDrop';

const GameLoader = (props) => {

    return <div className="game">
        <Switch>
            <Route path='/game/mathdrop' component={MathDrop} />
            <Route path='/game/speedmatch' component={SpeedMatch} />
        </Switch>
    </div>
}

export default GameLoader;