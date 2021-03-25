import React, {Component} from 'react';
import axios from 'axios';
import ForwardIcon from '@material-ui/icons/Forward';
import CountDown from '../Modal/CountDown';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

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
            game_started: false,
            animate: '',
            direction: '',
            answer: ''
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

    startCountDown = () => {
        this.setState({countdown: true});
    }

    startGame = () => {   
        console.log("play game");    
            this.setState({game_started: true, gameTime: 90, countdown: false});
            this.clock = setInterval(() => {console.log('run'); if(this.state.gameTime > 0){this.setState({gameTime: this.state.gameTime-1})} else if(this.state.game_started) { this.scoreGame() }}, 1000);
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
            color: newColor,
            animate: 'animate-card'
        });
    }

    compareShape = (event) => {

        if(event.key === 'ArrowRight' || event.code === "ArrowRight" || event.key === 'ArrowLeft' || event.code === "ArrowLeft"){
            event.preventDefault();
            if(!this.pressed)
            {
                if(event.key === 'ArrowRight' || event.code === "ArrowRight")
                {
                    if(this.state.prev.shape === this.state.shape && this.state.prev.color === this.state.color)
                    {
                        this.setState({consecutive: this.state.consecutive+1, score: this.state.score + (this.state.consecutive+1)*50, direction: 'right'});
                        console.log('correct');
                    } else {
                        this.setState({consecutive: 0, direction: 'right'});
                        console.log('wrong');
                    }
                } else if(event.key === 'ArrowLeft' || event.code === "ArrowLeft"){
                    if(this.state.prev.shape !== this.state.shape || this.state.prev.color !== this.state.color)
                    {
                        this.setState({consecutive: this.state.consecutive+1, score: this.state.score + (this.state.consecutive+1)*50, direction: 'left'});
                        console.log('correct');
                    } else {
                        this.setState({consecutive: 0, direction: 'left'});
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
            {this.state.countdown && <CountDown time={3} play={this.startGame}/>}
        <div className="gameInfo"><section className="score">Score: {this.state.score}</section><h1>{this.state.game_name}</h1><section className="timer">Time Remaining: {this.state.gameTime}</section></div>
            {!this.state.game_started ? <div className="about-game"><section className="how-to-play">Press the left arrow if the new card doesn't match the previous. Press the Right arrow if it does match! </section><button className="play" onClick={() => this.startCountDown()}>Play</button></div> :
            this.state.gameTime > 0 ? <section className="shapes"><section className={`discard-pile`} />
                <span><CheckIcon /><ClearIcon /></span>
                <section className={`card ${this.state.animate}`} onAnimationEnd={_ => this.setState({animate: ''})}><section className={`${this.state.shape} ${this.state.color}`} /></section></section> 
                : <div className="final-score">Game Over! <section> Final Score is {this.state.score}!</section></div>}
                <section className="arrows">
                    <label><ForwardIcon className={`left-arrow ${this.state.direction === 'left' ? 'click' : ''}`} onAnimationEnd={() => this.setState({direction: ''})}/>NO</label>
                <label><ForwardIcon className={`right-arrow ${this.state.direction === 'right'  ? 'click' : ''}`} onAnimationEnd={() => this.setState({direction: ''})} />YES</label>
                </section>
        </div>
    }
}

export default SpeedMatch;