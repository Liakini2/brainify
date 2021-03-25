import {useEffect, useState, useRef} from 'react';
const CountDown = (props) => {
    const [time, setTime] = useState(props.time);
    const [start, setStart] = useState(false);

    const cd = useRef();
    useEffect(() => {
        cd.current = setInterval(() => {
            console.log('stop running!');
            setTime(t => {
                if(t-1 <= 0) {setStart(true)} return t-1;
            })
        }, 1000)

        return (() => clearInterval(cd))
    }, [])

    useEffect(() => {
        if(start) {
            props.play();
            clearInterval(cd.current);
        }
    }, [start])
    return <>{time > 0 && <div className="countdown">{time}</div>}</>
}

export default CountDown;
