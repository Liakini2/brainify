import {useState, useEffect, useRef} from 'react';
import Tile from './Tile';

const MemoryMatrix = () => {
    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [activeTiles, setActiveTiles] = useState([]);
    const [guessedTiles, setGuessedTiles] = useState([]);
    const [gameTiles, setGameTiles] = useState(new Array(16));
    const [gameStart, setGameStart] = useState(false);

    const randomizeTiles = () => {
        for(let i = 0;i<level+3;i++)
        {
            //find a tile to set active
            let t;
            do {
                t = Math.floor(Math.random() * 16) 
            }
            while(activeTiles.includes(t))
            setActiveTiles([...activeTiles, t]);
        }
        showTiles();
    }

    const showTiles = () => {

    }

    const guessTile = (i) => {
        setGuessedTiles([...guessedTiles, i]);
        if(guessedTiles.length === activeTiles.length) {

        }
    }



    return <div className="memorymatrix">
        {!gameStart ? <section className="about-game">
            <p className="game-info">Progress through the levels trying to remember which tiles were highlighted. Every level you complete adds one tile, a missed tile will take you back a level</p>
            <button onClick={_setGameStart(true)}>Play</button>
        </section> : <section className="game-board">
                        {gameTiles.map((el, i) => <Tile key={i} index={i} guess={guessTile}/>)}
                      </section>}
    </div>
}

export default MemoryMatrix;