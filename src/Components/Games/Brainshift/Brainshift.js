import {useEffect, useState, useRef, useContext} from 'react';
import CountDown from '../Modal/CountDown';
import useKeyPress from '../useKeyPress';
import ForwardIcon from '@material-ui/icons/Forward';

const Brainshift = () => {
    const [startGame, setStartGame] = useState(false);
    const [number, setNumber] = useState(2);
    const [letter, setLetter] = useState('L');
    const [isiteven, setIsiteven] = useState(true);
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(60);
    const [consecutive, setConsecutive] = useState(1);
    const [countdown, setCountdown] = useState(false);
    const [direction, setDirection] = useState('');
    
    const timer = useRef();

    
    useKeyPress(['ArrowRight', 'ArrowLeft'], checkAnswer);
    
    useEffect(() => {
        // function check(e) {
        //     if(e.key === 'ArrowRight' || e.code === 'ArrowRight' || e.key === 'ArrowLeft' || e.code === 'ArrowLeft') {
        //         e.preventDefault();
        //         checkAnswer(e.key ? e.key : e.code);
        //     }
        // }
        // window.addEventListener('keyup', check)
        // useKeyPress(['ArrowRight', 'ArrowLeft'], checkAnswer);
        return (() => {
            clearInterval(timer.current);
            // window.removeEventListener('keyup', check)
        })
    }, []);

    useEffect(() => {
        if(time <= 0) {
            clearInterval(timer.current);
            // axios.post(`/api/score/${gamecontext.game_id}`, {score}).then(_ => {

            // }).catch(err => console.log(err));
        }
    }, [time])


    function checkAnswer(key) {
        console.log(key, isiteven, number, letter);
        const vowels = ['A', 'E', 'I', 'O', 'U'];
        // if(startGame) {   
            if(key === 'ArrowRight') {
                setDirection('right');
                if(isiteven) {
                    if(number % 2 === 0) {
                        setScore(score+(50*consecutive));
                        setConsecutive(consecutive+1);
                    } else {
                        setConsecutive(1);
                    }
                } else {
                    if(vowels.includes(letter)) {
                        setScore(score + (50*consecutive));
                        setConsecutive(consecutive+1);
                    } else {
                        setConsecutive(1);
                    }
                }
            } else if(key === 'ArrowLeft'){
                setDirection('left');
                if(!isiteven) {
                    if(number % 2 !== 0) {
                        setScore(score+(50*consecutive));
                        setConsecutive(consecutive+1);
                    } else {
                        setConsecutive(1);
                    }
                } else {
                    if(!vowels.includes(letter)) {
                        setScore(score + (50*consecutive));
                        setConsecutive(consecutive+1);
                    } else {
                        setConsecutive(1);
                    }
                }
            }
            changeCard();
        // }
    }

    const changeCard = () => {
        console.log('card changer');
        const letters = ['A', 'E', 'I', 'O', 'U', 'M', 'G', 'K', 'T', 'P'];
        setNumber(Math.floor(Math.random() * 8) + 1);
        setLetter(letters[Math.floor(Math.random() * letters.length)]);
        setIsiteven(Math.floor(Math.random() * 100) < 50);
    }

    const playGame = () => {
        setCountdown(false);
        setTime(60);
        timer.current = setInterval(() => {
            setTime(t => t-1);
        }, 1000);
    }
    

    return <div className="brainshift-game">
        {!startGame ? <section className="gameInfo"><p className="how-to-play">Top is Even numbers, Bottom is vowels. Press the left arrow if it doesn't match, the right arrow if it does match.</p>
        <button onClick={_ => {setCountdown(true); setStartGame(true);}}>PLAY</button></section> : countdown ? <CountDown time={3} play={playGame} /> : time > 0 ? <section className="brainshift">
            <section className="brainshift-header"><h3>Score: {score}</h3> <h2>Brain Shift</h2><h3>Time: {time}</h3></section>
            <div className="shiftcards">
                <section className="even">
                    {isiteven && <span className="shiftcard">
                        <h3>{number}{letter}</h3>    
                    </span>}
                </section>
                <section className="vowel">
                {!isiteven && <span className="shiftcard">
                        <h3>{number}{letter}</h3>    
                    </span>}
                </section>
            </div>
            <section className="arrows">
                <label><ForwardIcon className={`left-arrow${direction === 'left' ? ' click' : ''}`} onAnimationEnd={() => setDirection('')} />NO</label>

                <label><ForwardIcon className={`right-arrow${direction === 'right' ? ' click' : ''}`} onAnimationEnd={() => setDirection('')} />YES</label>
            </section>
        </section> : <section className="final-score">
                        <h3>Your Final Score is {score}</h3>
                        <button onClick={_ => setCountdown(true)} >Play Again!</button>
                     </section>}

    </div>
}

export default Brainshift;