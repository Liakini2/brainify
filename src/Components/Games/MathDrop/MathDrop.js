import {useState, useEffect, useRef, useContext} from 'react'
import Equation from './Equation'
import axios from 'axios'
import { GameContext } from '../../../context/GameContext'
import { UserContext } from '../../../context/UserContext'
import { useHistory } from 'react-router-dom'

const MathDrop = () => {
    const [userAnswer, setUserAnswer] = useState('')
    const [score, setScore] = useState(0)
    const [lives, setLives] = useState(0)
    const [equations, setEquations] = useState([])
    const [consecutive, setConsecutive] = useState(1)
    const id = useRef(0)
    const equationTimer = useRef()
    const history = useHistory()
    const gameContext = useContext(GameContext)
    const userValue = useContext(UserContext)

    useEffect(() => {
        axios.get('/auth/me')
        .then(({data})=>{
            userValue.setUser(data)
        })
        .catch(_=>history.push('/'))
    }, [])

    useEffect(() => {
        return(()=>{clearInterval(equationTimer.current)})
    }, [])

    useEffect(() => {
        if(lives===0){
            //will end game and send score to the server.
            setEquations([])
            clearInterval(equationTimer.current) 
            axios.post(`/api/score/${gameContext.game.game_id}`, {score})
                .then(_=>{})
                .catch(err=>console.log(err))
        }
    }, [lives])
    
    const generateProblem=()=>{
        let numOne=Math.floor(Math.random()*(11))
        let numTwo=Math.floor(Math.random()*(11))
        let operatorSelector=Math.floor(Math.random()*(2+1))
        let altOperator=['+', '-', 'X'][operatorSelector]
        id.current = id.current+1
        setEquations((e)=>[...e, {numOne, numTwo, altOperator, i: id.current}])
    }

    const checkAnswer=(event)=>{
        if(event.key==='Enter' || event.code==='Enter'){
            let indexArr = []
            for(let i=0; i<equations.length; i++){
                switch(equations[i].altOperator){
                    case '+':
                        if(equations[i].numOne + equations[i].numTwo == userAnswer){
                            //creates different array of index to remove from the equations.
                            indexArr.push(i)
                            setScore(score + (consecutive+1) *50)
                            setConsecutive(consecutive+1)
                        } 
                        break
                    case '-':
                        if(equations[i].numOne - equations[i].numTwo == userAnswer){
                            //creates different array of index to remove from the equations.
                            indexArr.push(i)
                            setScore(score + (consecutive+1) *50)
                            setConsecutive(consecutive+1)
                        } 
                        break
                    case 'X':
                        if(equations[i].numOne * equations[i].numTwo == userAnswer){
                            //creates different array of index to remove from the equations.
                            indexArr.push(i)
                            setConsecutive(consecutive+1)
                            setScore(score + (consecutive+1) *100)
                        } 
                        break
                    default:
                        break
                }
            } 
            let tempArr = equations.slice()
            for(let i=indexArr.length-1; i>=0; i--){
                tempArr.splice(indexArr[i], 1)
            }
            setEquations(tempArr)
            setUserAnswer('')
        }
    }

    const missedTarget=()=>{
        setLives(e=>{
            console.log(e-1)
            return e-1
        })
        setEquations([])
    }

    const playGame=()=>{
        id.current = 0
        setLives(3)
        setScore(0)
        equationTimer.current = setInterval(()=>{
            generateProblem()
        },2000)
    }

    return (
        <div className='gameDisplay'>
            <h1 className='hub'>Your Score: {score}</h1>
            <div className='centerGame'>
                <h1 className='gameTitle'>mathdrop</h1>
                {lives<=0?<div className='startNewGame'>
                    <p className='gameInstructions'>Type the answer to the equation into the box at the bottowm of the screen and press enter to submit your answer, before the equation falls to the bottom. You have three lives.</p>
                    <button className='playBtn' onClick={playGame}>Play</button>
                </div>
                :
                <div className='mathdropGame'>
                    {equations.map((equation)=>{
                        return(<Equation className='displayEquations' key={equation.i} missedTarget={missedTarget} numOne={equation.numOne} numTwo={equation.numTwo} altOperator={equation.altOperator}/>)
                    })}
                    <input className='user-answer' type='number' value={userAnswer} onKeyPress={checkAnswer} onChange={(e)=>{setUserAnswer(e.target.value)}}/>
                </div>
                }
            </div>
            <h1 className='hub'>Lives Remainning: {lives}</h1>  
        </div>
    )
}

export default MathDrop