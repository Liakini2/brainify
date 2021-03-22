import React, {useState, useEffect} from 'react';

const SpeedMatch = () => {
    // let prev = {shape: '', color: ''};

    let colors = ['red', 'yellow', 'purple', 'green'];
    let shapes = ['square', 'triangle', 'circle', 'star'];
    
    
    const [color, setColor] = useState(colors[0]);
    const [shape, setShape] = useState(shapes[2]);
    const [prev, setPrev] = useState({shape: '', color: ''})

    useEffect(() => {
        window.addEventListener('keydown', compareShapes);
        console.log('got here')
        setShape(shapes[Math.floor(Math.random() * shapes.length)]);
        setColor(colors[Math.floor(Math.random() * colors.length)]);
        setPrev({shape: shape, color: color});
        return () => {
            window.removeEventListener('keydown', compareShapes); 
        }
    }, [])
    

    const getShapeAndColor = () => {
        console.log('next?', shape, color, prev)
        setPrev({shape, color});
        setShape(shapes[Math.floor(Math.random() * shapes.length)]);
        setColor(colors[Math.floor(Math.random() * colors.length)]);
    }


    const compareShapes = (event) => {
        event.preventDefault();
        // console.log(prev);
        if(event.key === 'ArrowRight' || event.code === "ArrowRight")
        {
            if(shape === prev.shape && color === prev.color)
            {
                // alert('correct');
            } else {
                // alert('wrong');
            }
        } else if (event.key === "ArrowLeft" || event.code === "ArrowLeft")
        {
            console.log(shape.name !== prev.shape, color !== prev.color)
            if(shape !== prev.shape || color !== prev.color)
            {
                // alert('correct');
            } else {
                // alert('wrong');
            }
        } else {
            console.log('here?')
            return;
        }
        getShapeAndColor();
    }

    return (
        <div className='speedmatch' autoFocus onKeyDown={(event) => {
            console.log(event)
            event.preventDefault();
            setPrev({shape, color});
            setShape(shapes[Math.floor(Math.random() * shapes.length)]);
            setColor(colors[Math.floor(Math.random() * colors.length)]);
        }}>
            <div className={`${shape} ${color}`}/>
        </div>
    )
}

export default SpeedMatch;
