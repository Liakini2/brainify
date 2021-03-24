import React, {useState, useEffect} from 'react'
import Card from './Card'

const Memory = () => {
    const [score, setScore] = useState(0)
    const [lives, setLives] = useState(3)
    const [gameState, setGameState] = useState('menu')

    const [cards, setCards] = useState(['green', 'red', 'yellow', 'blue', 'pink', 'orange', 'purple', 'black', 'green', 'red', 'yellow', 'blue', 'pink', 'orange', 'purple', 'black'])
    const [selected, setSelected] = useState([])
    const [hideAll, setHideAll] = useState('')
    const [rehide, setRehide] = useState([])
    // const [deactivate, setDeactivate] = useState(0)



    const shuffle = (array) => {
        let arr = array
        arr.sort(() => Math.random() - 0.5);
        setCards(arr)
    }

    const newGame = () => {
        setScore(0)
        setLives(3)
        shuffle(cards)
        setHideAll('')

        setTimeout(() => {
            setHideAll('hidden')
        }, 5000)

    }



    //Wait for two cards to compare and then add to score or take a life
    useEffect(() => {
        if(selected.length === 2) {
            if(cards[selected[0]] === cards[selected[1]]) {
                setScore(score + 1)
            }else {
                setLives(lives - 1)
            }
            setTimeout(() => {
                setSelected([])
            }, 2000)
            // setDeactivate(deactivate + 1)
        }
    },[selected])

    //Listen for game over
    useEffect(() => {
        if(lives <= 0){
            setGameState('gameOver')
        }
    },[lives])

    //Listen for victory
    useEffect(() => {
        if(score === 8){
            setGameState('victory')
        }
    }, [score])
    


    return (

        <div className='memoryGame'>

            {gameState === 'menu'? 
            <div className='startCard'>
                <p>This is a description of the game.</p>
                <button onClick={() => {
                    newGame()
                    setGameState('play') 
                }}>Start!</button>
            </div> 


            :gameState === 'play'? 
            <div className='gameSpace'> 
                <h1>Score: {score}</h1>
                <div className='actualGame'>
                    {cards.map((elem, i) => {
                        return <>
                            <Card 
                                color={elem} 
                                index={i}
                                hide={hideAll}
                                active={selected.includes(i)? 'selected' : ''}
                                selectedFunc={(i) => setSelected([...selected, i])}
                            />
                        </>
                    })}
                </div>
                <h1>Lives: {lives}</h1>
            </div>


            :gameState === 'victory'?
            <div className='victory'>
                <h1>A Winner Is You!</h1>
                <h1>Final Score: {score}</h1>
                <button onClick={setGameState('menu')}>Replay</button>
            </div>


            :gameState === 'gameOver'?
            <div className='gameOver'>
                <h1>Game Over</h1>
                <h1>Score: {score}</h1>
                <button onClick={setGameState('menu')}>Try Again</button>
            </div>


            :
            <div>
                Error
            </div>
            }


        </div>

    )
}

export default Memory
