import React, {useState, useEffect} from 'react'
import Card from './Card'

const Memory = () => {
    const [score, setScore] = useState(0)
    const [lives, setLives] = useState(3)
    const [gameStart, setGameStart] = useState(false)
    const [cards, setCards] = useState(['green', 'red', 'yellow', 'blue', 'pink', 'orange', 'purple', 'black', 'green', 'red', 'yellow', 'blue', 'pink', 'orange', 'purple', 'black'])

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    useEffect(() => {
        shuffle(cards)
    },[])

    return (
        <div className='memoryGame'>

            {!gameStart? 
            <div className='startCard'>
                <p>This is a description of the game.</p>
                <button onClick={() => setGameStart(!gameStart)}>Start!</button>
            </div> 
            : 
            <div className='actualGame'>
                {cards.map(elem => {
                    <>
                        <Card color={elem} hide={}/>
                    </>
                })}
            </div>}

        </div>
    )
}

export default Memory
