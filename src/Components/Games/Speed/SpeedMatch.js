import React, {Component} from 'react';
import axios from 'axios';

class SpeedMatch extends Component {
    constructor(props) {
        super(props);

        this.pressed = false;
        this.state = {
            prev: {shape: '', color: ''},
            shape: 'square',
            color: 'red',
            gameTime: 90,
            score: 0,
            consecutive: 0,
            game_id: props.game_id,
            game_name: props.game_name,
            game_started: false
        }
    }

    componentDidMount(){
        window.addEventListener('keydown', this.compareShape);
        window.addEventListener('keyup', this.setPressed);
        console.log(this.state.game_id, this.state.game_name)
        this.newShape();
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.compareShape);
        window.removeEventListener('keyup', this.setPressed);
        clearInterval(this.clock);
    }

    setPressed = () => {
        this.pressed = false;
    }

    startGame = () => {
        console.log('here');
        let time = 3;
        const start = setInterval(() => {
            console.log(time);
            if(time > 0){
            time--;
        } else {
            this.clock = setInterval(() => {if(this.state.gameTime > 0){this.setState({gameTime: this.state.gameTime-1})} else if(this.state.game_started) { this.scoreGame() }}, 1000);
            this.setState({game_started: true, gameTime: 90}, clearInterval(start));
        }}, 1000);
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

        //animate card like it's going into used pile and a new one is being laoded on keypress. I may need a 'card' component in order to unmount and remount component.
        //potentially transform: translate(-200px, 0) unmount and then remount at original location. 
        // https://dev.to/samwatts98/how-to-easily-animate-your-react-components-on-click-with-css-keyframes-26mg
        //https://blog.bitsrc.io/how-to-trigger-animation-events-using-react-a6c3256b21c6?gi=3d76305958db
        //onAnimationEnd

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

    scoreGame = () => {
        clearInterval(this.clock);
        if(this.state.game_started){
            axios.post(`/api/score/${this.state.game_id}`, {score: this.state.score}).then(_ => {
                this.setState({game_started: false});
            }).catch(err => console.log(err));
        }
    }

    render() {
        // console.log("previous: " + this.state.prev.shape + " " + this.state.prev.color, this.state.color, this.state.shape);
        return <div className="speedmatch">
        <div className="gameInfo"><section className="score">Score: {this.state.score}</section><h1>{this.state.game_name}</h1><section className="timer">Time Remaining: {this.state.gameTime}</section></div>
            {!this.state.game_started ? <div className="about-game"><section className="how-to-play">Press the left arrow if the new card doesn't match the previous. Press the </section><button className="play" onClick={() => this.startGame()}>Play</button></div> :
            this.state.gameTime > 0 ? <section className="shapes"><section className={`${this.state.shape} ${this.state.color}`} /></section> : <div className="final-score">Game Over! <br /><section> Final Score is {this.state.score}!</section></div>}
        </div>
    }
}

export default SpeedMatch;