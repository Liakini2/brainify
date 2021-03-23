import {useEffect} from 'react'


const Equation = (props) => {
    useEffect(() => {
        let time = 10
        const timer = setInterval(()=>{
            time--
            if(time===0){
                props.missedTarget()
            }
        },1000)
        return () => {clearInterval(timer)}
    }, [])

    return (
        <li className='equation'>
            {`${props.numOne} ${props.altOperator} ${props.numTwo} =`}
        </li>
    )
}

export default Equation
