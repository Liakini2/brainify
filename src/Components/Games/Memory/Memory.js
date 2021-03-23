import React, {useState, useEffect} from 'react'
import Card from './Card'

const Memory = () => {
    const [score, setScore] = useState(0)
    const [lives, setLives] = useState(3)
    const [gameState, setGameState] = useState('menu')

    const [cards, setCards] = useState(['green', 'red', 'yellow', 'blue', 'pink', 'orange', 'purple', 'black', 'green', 'red', 'yellow', 'blue', 'pink', 'orange', 'purple', 'black'])
    const [selected, setSelected] = useState([])
    const [hideAll, setHideAll] = useState('')
    const [deactivate, setDeactivate] = useState(0)



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
                score++
            }else {
                setLives(lives--)
            }
            setSelected([])
            setDeactivate(deactivate++)
        }
    },[selected])

    //Listen for game over
    useEffect(() => {
        if(lives <= 0){
            setGameState('')
        }
    },[lives])
    


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
            <div className='actualGame'>
                {cards.map((elem, i) => {
                    <>
                        <Card 
                            color={elem} 
                            index={i}
                            hide={hideAll}
                            deactivate={deactivate}
                            setSelected={setSelected} 
                            selected={selected}
                        />
                    </>
                })}
            </div>


            :
            <div className='gameOver'>
                <h1>Game Over</h1>
                <h1>Score: {score}</h1>
                <button onClick={setGameState('menu')}>Try Again</button>
            </div>
            }


        </div>

    )
}

export default Memory
