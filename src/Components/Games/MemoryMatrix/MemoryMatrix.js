import {useState, useEffect} from 'react';
import Tile from './Tile';

const MemoryMatrix = () => {
    const someTiles = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [activeTiles, setActiveTiles] = useState([]);
    const [correctTiles, setCorrectTiles] = useState([]);
    const [gameTiles, setGameTiles] = useState(someTiles);
    const [gameStart, setGameStart] = useState('menu');

    

    const randomizeTiles = () => {
        let arr = [];
        while(arr.length < level + 3) {
            let t = Math.floor(Math.random() * 16)
            if(arr.indexOf(t) === -1) arr.push(t)
        }
        setActiveTiles(arr);
    }

    const addCorrectTile = (i) => {
        setCorrectTiles([...correctTiles, i])
    }

    const victory = () => {
        setLevel((level) => level + 1)
        randomizeTiles()
        setCorrectTiles([])
        if(level === 7){
            setGameStart('victory')
        }else{
            setGameStart('play')
        }
    }

    useEffect(() => {
        randomizeTiles()
    },[])

    useEffect(() => {
        if(correctTiles.length === activeTiles.length && activeTiles.length !== 0){
            victory()
        }
    },[correctTiles])


    console.log(`acc ${activeTiles}`)
    console.log(`cor ${correctTiles}`)
    return <div className="memorymatrix">

        {gameStart === 'menu' ? 

            <section className="about-game">
                <p className="game-info">Progress through the levels trying to remember which tiles were highlighted. Every level you complete adds one tile, a missed tile will take you back a level</p>
                <button onClick={() => setGameStart('play')}>Play</button>
            </section> 

        :gameStart === 'play'?

            <section className="game-board">
                {gameTiles.map((el, i) => <Tile key={i} index={i} guess={addCorrectTile} tileSecrets={activeTiles}/>)}
            </section>

        :gameStart === 'victory'?

            <section className='victory'>
                <h1>A winner is you!</h1>
                <h1>Final Score: </h1>
                <button onClick={() => setGameStart('menu')}>Play Again</button>
            </section>

        :

            <div>Error</div>

        }

    </div>
}

export default MemoryMatrix;