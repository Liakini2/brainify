import axios from 'axios'
import React, {useState, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom';
import { GameContext } from '../../../context/GameContext'
import {UserContext} from '../../../context/UserContext';
import CountDown from '../Modal/CountDown'
import Card from './Card'

const Memory = () => {

    // const userValue = useContext(UserContext);
    // const history = useHistory();

    // useEffect(() => {
    //     axios.get('/auth/me')
    //     .then(({data})=>{
    //         userValue.setUser(data)
    //     })
    //     .catch(_=>history.push('/'))
    // }, []);

    const [augScore, setAugScore] = useState(0)
    const [score, setScore] = useState(0)
    const [lives, setLives] = useState(5)
    const [gameState, setGameState] = useState('menu')
    const [selected, setSelected] = useState([])
    const [cards, setCards] = useState([
        {color: 'green', active: false, hidden: false, disabled: true, correct: false}, 
        {color: 'red', active: false, hidden: false, disabled: true, correct: false}, 
        {color: 'yellow', active: false, hidden: false, disabled: true, correct: false}, 
        {color: 'blue', active: false, hidden: false, disabled: true, correct: false}, 
        {color: 'pink', active: false, hidden: false, disabled: true, correct: false}, 
        {color: 'orange', active: false, hidden: false, disabled: true, correct: false}, 
        {color: 'purple', active: false, hidden: false, disabled: true, correct: false}, 
        {color: 'black', active: false, hidden: false, disabled: true, correct: false}, 
        {color: 'green', active: false, hidden: false, disabled: true, correct: false}, 
        {color: 'red', active: false, hidden: false, disabled: true, correct: false}, 
        {color: 'yellow', active: false, hidden: false, disabled: true, correct: false}, 
        {color: 'blue', active: false, hidden: false, disabled: true, correct: false}, 
        {color: 'pink', active: false, hidden: false, disabled: true, correct: false}, 
        {color: 'orange', active: false, hidden: false, disabled: true, correct: false}, 
        {color: 'purple', active: false, hidden: false, disabled: true, correct: false}, 
        {color: 'black', active: false, hidden: false, disabled: true, correct: false}
    ])
    
    const gameContext = useContext(GameContext);

    const shuffle = (array) => {
        let arr = array
        arr.sort(() => Math.random() - 0.5);
        setCards(arr)
    }

    const newGame = () => {
        setScore(0)
        setAugScore(0);
        setLives(5)
        shuffle(cards)
        let arr = cards.map((elem) => {
            elem.hidden = false
            elem.active = false
            elem.disabled = true
            return elem
        })
        setCards(arr)

        setTimeout(() => {
            let arr = cards.map((elem) => {
                elem.hidden = true
                elem.disabled = false
                elem.correct = false
                return elem
            })
            setCards(arr)
        }, 3000)

    }

    const doTheThing = () => {
        // console.log('The thing has been done')
    }

    const postScore = async (gameId, score) => {
        // console.log('score', score)
        try{
            await axios.post(`api/score/${gameId}`, {score})
         }catch(err){
             console.log(err)
        }
    }

    const setHide = (i, hideProp) => {
        let hideAgain = cards.slice()
        hideAgain[i].hidden = !hideProp
        setCards(hideAgain)
    }

    const selectedFunc = (i) => {
        setSelected([...selected, i])
        let giveBorder = cards.slice()
        giveBorder[i].active = true
        setCards(giveBorder)
    }

    //makes the score more interesting
    // useEffect(() => {
    //     if(lives === 0){
    //         setAugScore(score)
    //     }else{
    //         setAugScore(score)
    //     }
    // },[selected])

    useEffect(() => {
        if(lives <= 0) {
            setSelected([])
            postScore(gameContext.game.game_id, augScore)
            setAugScore(augScore);
            setTimeout(() => {
                setGameState('gameOver')
            }, 1000)  
        }else{
            // console.log('selected: ', selected);
            let array = cards.map((elem) => {
                elem.disabled = true
                return elem
            })
            setCards(array)
            setTimeout(() => {
                let hideAgain = array.slice()
                if(selected.length === 2) {
                    hideAgain[selected[0]].hidden = true
                    hideAgain[selected[1]].hidden = true
                    hideAgain[selected[0]].active = false
                    hideAgain[selected[1]].active = false
                }
                setCards(hideAgain)
                let arr = cards.map((elem) => {
                    elem.disabled = false
                    return elem
                })
                // console.log(arr)
                setCards(arr)
                setSelected([])   
            }, 1500)
        }
    }, [lives])




    //Wait for two cards to compare and then add to score or take a life
    useEffect(() => {
        if(selected.length === 2) {
            if(cards[selected[0]].color === cards[selected[1]].color) {

                //good comparison: if score is max then victory
                setScore(score + 150);
                setAugScore(score + 150);
                //check for game end
                
                // console.log(cards.filter(c => c.correct).length);
                if(cards.filter(c => c.correct).length === 14){
                    console.log('not getting here')
                    setSelected([])
                    setAugScore(augScore*lives*10);
                    postScore(gameContext.game.game_id, augScore * lives)
                    setTimeout(() => {
                        setGameState('victory')
                    },1000)
                }else{
                    let arr = cards.map((elem) => {
                        elem.disabled = true
                        return elem
                    })
                    setCards(arr)
                    setTimeout(() => {
                        let arr = cards.map((elem) => {
                            elem.disabled = false
                            return elem
                        })
                        setCards(arr)
                        let deactivate = cards.slice()
                        deactivate[selected[0]].active = false
                        deactivate[selected[1]].active = false
                        deactivate[selected[0]].correct = true
                        deactivate[selected[1]].correct = true
                        setCards(deactivate)
                        setSelected([])
                    }, 1500)
                }

                
            }else {

                //bad comparison: if no lives remain then gameover
                setLives(lives - 1)
                
            }
        }
    },[selected])


    
    

    
    return (

        <div className='memoryGame'>

            {gameState === 'menu'? 
            <div className='startCard'>
                <h1>Memory Cards!</h1>
                <p>Match all the cards </p>
                <button onClick={() => {
                    newGame()
                    setGameState('play') 
                }}>Start!</button>
            </div> 


            :gameState === 'play'? 
            <div>
                <CountDown time={3} play={doTheThing} />
                <div className='gameSpace'> 
                    <h1>Lives: {lives}</h1>
                    <div className='actualGame'>
                        {cards.map((elem, i) => {
                            return <>
                                <Card 
                                    color={elem.color} 
                                    index={i}
                                    hide={elem.hidden}
                                    active={elem.active}
                                    disabled={elem.disabled? true : elem.correct? true : false}
                                    selected={selected}
                                    setHide={setHide}
                                    selectedFunc={selectedFunc}
                                />
                            </>
                        })}
                    </div>
                    <h1>Score: {augScore}</h1>
                </div>
            </div>


            :gameState === 'victory'?
            <div className='victory'>
                <h1>A Winner Is You!</h1>
                <h1>Final Score: {augScore}</h1>
                <button onClick={() => setGameState('menu')}>Replay</button>
            </div>


            :gameState === 'gameOver'?
            <div className='gameOver'>
                <h1>Game Over</h1>
                <h1>Score: {augScore}</h1>
                <button onClick={() => setGameState('menu')}>Try Again</button>
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
