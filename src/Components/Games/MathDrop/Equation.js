import {useEffect, useRef} from 'react'

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

    const style = useRef({
        left: Math.floor(Math.random()*80)+'vw' 
    })

    return (
        <li className='equation' style={style.current}>
            {`${props.numOne} ${props.altOperator} ${props.numTwo} =`}
        </li>
    )
}

export default Equation
