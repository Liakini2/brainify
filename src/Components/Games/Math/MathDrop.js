import {useState, useEffect} from 'react'

const MathDrop = () => {
    const [userAnswer, setUserAnswer] = useState('')
    const [score, setScore] = useState(0)
    const [wrongAnswers, setWrongAnswers] = useState(0)
    const [num1, setNum1] = useState(0)
    const [num2, setNum2] = useState(0)
    const [operator, setOperator] = useState('')

    useEffect(() => {
        generateProblem()
    }, [])
    
    const generateProblem=()=>{
        let numOne=Math.floor(Math.random()*(11))
        let numTwo=Math.floor(Math.random()*(11))
        let operatorSelector=Math.floor(Math.random()*(2+1))
        let altOperator=['+', '-', 'X'][operatorSelector]
        setNum1(numOne)
        setNum2(numTwo)
        setOperator(altOperator)
    }

    const enterAnswer=()=>{
        document.getElementsByClassName('user-answer').addEventListener('keyup', function(event){
            if(event.keyCode === 13){
                let x = document.getElementById('math-game-form')
                x.submit()
                return false
            }
        })
    }

    console.log(num1)
    console.log(num2)
    console.log(operator)

    return (
        <div>
            <p className='problem'>{`${num1} ${operator} ${num2} =`}</p>
            <form className='math-game-form' onSubmit={()=>{enterAnswer()}}>
                <input className='user-answer' value={userAnswer} onChange={e=>{setUserAnswer(e.target.value)}}/>
            </form>
        </div>
    )
}

export default MathDrop
