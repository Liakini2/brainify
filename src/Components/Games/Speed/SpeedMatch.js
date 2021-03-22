import React, {useState} from 'react'

const Speed = () => {

    let shapes = ['square', 'triangle', 'circle', 'star'];
    let colors = ['red', 'yellow', 'purple', 'green'];
    const [shape, setShape] = useState(shapes[0]);
    const [color, setColor] = useState(colors[0]);

    let prev = [];

    return (
        <div className='speedmatch'>
            <div className={`shape ${shape}`} style={{backgroundColor: color}}/>
        </div>
    )
}

export default Speed;
