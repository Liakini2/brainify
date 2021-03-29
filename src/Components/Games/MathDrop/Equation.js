import {useEffect, useRef, useState} from 'react'

const Equation = (props) => {
    // const [time, setTime] = useState(6);
    const [time, setTime] = useState(Math.floor(Math.random() * 8) + 4);
    useEffect(() => {
        // console.log('t:',props.time);
        let t = time;
        const timer = setInterval(()=>{
            t--;
            if(t <= 0){
                props.missedTarget()
            }
        },1000)
        return () => {clearInterval(timer)}
    }, [])

    // const style = useRef({
    //     left: Math.floor(Math.random()*80)+'vw' 
    // })
    const style = useRef({
        left: (Math.floor(Math.random()*65)+15)+'%',
        animation: `drop ${time}s forwards`,
        animationTimingFunction: 'linear'
    })

    // console.log(style)

    //  ${time === 6 ? ' fastDrop' : time === 12 ? ' slowDrop' : ''}
    return (
        <div className={`equation`} style={style.current}>
            {`${props.numOne} ${props.altOperator} ${props.numTwo} =`}
        </div>
    )
}

export default Equation
