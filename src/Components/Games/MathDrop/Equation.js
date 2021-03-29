import {useEffect, useRef} from 'react'

const Equation = (props) => {
    useEffect(() => {
        console.log('t:',props.time);
        let time = props.time;
        const timer = setInterval(()=>{
            time--
            if(time===0){
                props.missedTarget()
            }
        },1000)
        return () => {clearInterval(timer)}
    }, [])

    // const style = useRef({
    //     left: Math.floor(Math.random()*80)+'vw' 
    // })
    const style = useRef({
        left: (Math.floor(Math.random()*65)+15)+'%'
    })

    // console.log(style)

    return (
        <div className={`equation ${props.time === 6 ? 'fastDrop' : props.time === 12 ? 'slowDrop' : 'normalDrop'}`} style={style.current}>
            {`${props.numOne} ${props.altOperator} ${props.numTwo} =`}
        </div>
    )
}

export default Equation
