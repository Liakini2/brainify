import React, {useState, useEffect, useRef} from 'react';
// let pressed = false;

// const SpeedMatch = () => {
//     // let prev = {shape: '', color: ''};

//     let colors = ['red', 'yellow', 'purple', 'green'];
//     let shapes = ['square', 'triangle', 'circle', 'star'];
    
//     // const prevShapeRef = useRef();
//     // const prevColorRef = useRef();
//     const [color, setColor] = useState(colors[0]);
//     const [shape, setShape] = useState(shapes[2]);
//     // const [colorShape, setColorShape] = useState({shape: '', color: ''})
//     const [prev, setPrev] = useState({shape: '', color: ''})

//     useEffect(() => {
//         window.addEventListener('keydown', compareShapes);
//         window.addEventListener('keyup', () => pressed = false);
//         setShape(shapes[Math.floor(Math.random() * shapes.length)]);
//         setColor(colors[Math.floor(Math.random() * colors.length)]);
//         // prevShapeRef.current = shape;
//         // prevColorRef.current = color;
//         // setPrev({shape: shape, color: color});
//         return () => {
//             window.removeEventListener('keydown', compareShapes); 
//         }
//     }, [])

//     // useEffect(() => {
//     //     console.log('effect', colorShape.shape, colorShape.color, prev)
//     //     setPrev({shape: colorShape.shape, color: colorShape.color});
//     // }, [shape, color]);
    

//     const getShapeAndColor = () => {
        
//         // prevShapeRef.current = shape;
//         // prevColorRef.current = color;
//         // setPrev({shape: shape, color: color});
//         setShape(shapes[Math.floor(Math.random() * shapes.length)]);
//         setColor(colors[Math.floor(Math.random() * colors.length)]);
//     }


    
//     const compareShapes = (event) => {

//         event.preventDefault();
//         console.log(event);
//         if(!pressed) {
//             pressed = true;
//             if(event.key === 'ArrowRight' || event.code === "ArrowRight")
//             {
//                 // if(shape === prevShapeRef && color === prevColorRef)
//                 // {
//                 //     // alert('correct');
//                 // } else {
//                 //     // alert('wrong');
//                 // }
//             } else if (event.key === "ArrowLeft" || event.code === "ArrowLeft")
//             {
//                 // console.log(shape.name !== prevShapeRef, color !== prevColorRef)
//                 // if(shape !== prevShapeRef || color !== prevColorRef)
//                 // {
//                 //     // alert('correct');
//                 // } else {
//                 //     // alert('wrong');
//                 // }
//             } else {
//                 console.log('here?')
//                 return;
//             }
//             getShapeAndColor();
//         }
//     }

//     // console.log('next?', shape, color, prev)
//     return (
//         <div className='speedmatch' autoFocus onKeyDown={(event) => {
//             // console.log(event)
//             // event.preventDefault();
//             // // setPrev({shape, color});
//             // setShape(shapes[Math.floor(Math.random() * shapes.length)]);
//             // setColor(colors[Math.floor(Math.random() * colors.length)]);
//         }}>
//             <div className={`${shape} ${color}`}/>
//         </div>
//     )
// }

// export default SpeedMatch;

class SpeedMatch extends React.Component {
    constructor() {
        super();

        this.pressed = false;
        this.state = {
            prev: {shape: '', color: ''},
            shape: 'square',
            color: 'red',
            gameTime: 90,
            score: 0,
            consecutive: 0
        }
    }

    componentDidMount(){
        window.addEventListener('keydown', this.compareShape);
        window.addEventListener('keyup', this.setPressed);
        this.newShape();
        setInterval(() => {if(this.state.gameTime > 0){this.setState({gameTime: this.state.gameTime-1})}}, 1000);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.compareShape)
        window.removeEventListener('keyup', this.setPressed)
    }

    setPressed = () => {
        this.pressed = false;
    }

    startTimer = () => {
        
    }

    newShape = () => {
        let colors = ['red', 'yellow', 'purple', 'green'];
        let shapes = ['square', 'triangle', 'circle', 'star'];
        let newShape, newColor;
        if(Math.floor(Math.random * 100) < 50)
        {
            newShape = this.state.shape;
            newColor = this.state.color;
        } else {
        newShape = Math.floor(Math.random()*100) < 50 ? shapes[Math.floor(Math.random() * shapes.length)] : this.state.shape;
        newColor = Math.floor(Math.random()*100) > 49 ? colors[Math.floor(Math.random() * colors.length)] : this.state.color;
        }

        this.setState({
            prev: {shape: this.state.shape, color: this.state.color},
            shape: newShape,
            color: newColor
        });
    }

    compareShape = (event) => {
        event.preventDefault();
        if(event.key === 'ArrowRight' || event.code === "ArrowRight" || event.key === 'ArrowLeft' || event.code === "ArrowLeft"){
            if(!this.pressed)
            {
                if(event.key === 'ArrowRight' || event.code === "ArrowRight")
                {
                    if(this.state.prev.shape === this.state.shape && this.state.prev.color === this.state.color)
                    {
                        this.setState({consecutive: this.state.consecutive+1, score: this.state.score + (this.state.consecutive+1)*50});
                        console.log('correct');
                    } else {
                        this.setState({consecutive: 0});
                        console.log('wrong');
                    }
                } else if(event.key === 'ArrowLeft' || event.code === "ArrowLeft"){
                    if(this.state.prev.shape !== this.state.shape || this.state.prev.color !== this.state.color)
                    {
                        this.setState({consecutive: this.state.consecutive+1, score: this.state.score + (this.state.consecutive+1)*50});
                        console.log('correct');
                    } else {
                        this.setState({consecutive: 0});
                        console.log('wrong');
                    }
                }
                this.newShape();
                this.pressed = true;
            }
        }

    }

    render() {
        // console.log("previous: " + this.state.prev.shape + " " + this.state.prev.color, this.state.color, this.state.shape);
        return <div className="speedmatch">
            <section className="gameInfo"><section className="score">Score: {this.state.score}</section><section className="timer">Time Remaining: {this.state.gameTime}</section></section>
            {this.state.gameTime > 0 ? <section className="shapes"><section className={`${this.state.shape} ${this.state.color}`} /></section> : <div className="final-score">Game Over! <br /><section> Final Score is {this.state.score}!</section></div>}
        </div>
    }
}

export default SpeedMatch;