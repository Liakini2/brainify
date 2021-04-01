import {useEffect, useState, useRef, useContext} from 'react';
import CountDown from '../Modal/CountDown';
import useKeyPress from '../useKeyPress';
import ForwardIcon from '@material-ui/icons/Forward';
import axios from 'axios';
import {GameContext} from '../../../context/GameContext';
import {UserContext} from '../../../context/UserContext';
import {useHistory} from 'react-router-dom';

const Brainshift = () => {
    const [startGame, setStartGame] = useState(false);
    const [number, _setNumber] = useState(2);
    const numberRef = useRef(number);
    const [letter, _setLetter] = useState('L');
    const letterRef = useRef(letter);
    const [isiteven, _setIsiteven] = useState(true);
    const evenRef = useRef(isiteven);
    const [score, _setScore] = useState(0);
    const scoreRef = useRef(score);
    const [time, setTime] = useState(60);
    const [consecutive, _setConsecutive] = useState(1);
    const consecutiveRef = useRef(consecutive);
    const [countdown, setCountdown] = useState(false);
    const [direction, setDirection] = useState('');
    
    const timer = useRef();

    const gamecontext = useContext(GameContext);

    
    useKeyPress(['ArrowRight', 'ArrowLeft'], checkAnswer);

    const userValue = useContext(UserContext);
    const history = useHistory();
    
    useEffect(() => {
        // axios.get('/auth/me')
        // .then(({data})=>{
        //     userValue.setUser(data)
        // })
        // .catch(_=>history.push('/'))

        return (() => {
            clearInterval(timer.current);
        })
    }, []);

    useEffect(() => {
        if(time <= 0) {
            clearInterval(timer.current);
            axios.post(`/api/score/${gamecontext.game.game_id}`, {score}).then(_ => {

            }).catch(err => console.log(err));
        }
    }, [time])


    function checkAnswer(key) {
        const vowels = ['A', 'E', 'I', 'O', 'U'];
            if(key === 'ArrowRight') {
                setDirection('right');
                if(evenRef.current) {
                    if(numberRef.current % 2 === 0) {
                        addScore();
                    } else {
                        setConsecutive(1);
                    }
                } else {
                    if(vowels.includes(letterRef.current)) {
                        addScore();
                    } else {
                        setConsecutive(1);
                    }
                }
            } else if(key === 'ArrowLeft'){
                setDirection('left');
                if(evenRef.current) {
                    if(numberRef.current % 2 !== 0) {
                        addScore();
                    } else {
                        setConsecutive(1);
                    }
                } else {
                    if(!vowels.includes(letterRef.current)) {
                        addScore();
                    } else {
                        setConsecutive(1);
                    }
                }
            }
            changeCard();
    }

    const addScore = () => {
        setScore(scoreRef.current + (50 * consecutiveRef.current));
        setConsecutive(consecutiveRef.current+1);
    }

    const changeCard = () => {
        const letters = ['A', 'E', 'I', 'O', 'U', 'M', 'G', 'K', 'T', 'P'];
        setNumber(Math.floor(Math.random() * 8) + 1);
        setLetter(letters[Math.floor(Math.random() * letters.length)]);
        setIsiteven(Math.floor(Math.random() * 100) < 50);
    }

    const setNumber = (n) => {
        numberRef.current = n;
        _setNumber(n);
    }

    const setLetter = (l) => {
        letterRef.current = l;
        _setLetter(l);
    }

    const setIsiteven = (e) => {
        evenRef.current = e;
        _setIsiteven(e);
    }

    const setConsecutive = (c) => {
        consecutiveRef.current = c;
        _setConsecutive(c);
    }

    const setScore = (s) => {
        scoreRef.current = s;
        _setScore(s);
    }

    const playGame = () => {
        setCountdown(false);
        setTime(60);
        setScore(0);
        timer.current = setInterval(() => {
            setTime(t => t-1);
        }, 1000);
    }
    

    return <div className="brainshift-game">
        {!startGame ? <section className="gameInfo"><p className="how-to-play">Top is Even numbers, Bottom is vowels. Press the left arrow if it doesn't match, the right arrow if it does match.</p>
        <button onClick={_ => {setCountdown(true); setStartGame(true);}}>PLAY</button></section> : countdown ? <CountDown time={3} play={playGame} /> : time > 0 ? <section className="brainshift">
            <section className="brainshift-header"><h3>Score: {scoreRef.current}</h3> <h2>Brain Shift</h2><h3>Time: {time}</h3></section>
            <div className="shiftcards">
                <section className="even">
                    {isiteven && <span className="shiftcard">
                        <h3>{numberRef.current}{letterRef.current}</h3>    
                    </span>}
                </section>
                <section className="vowel">
                {!isiteven && <span className="shiftcard">
                        <h3>{numberRef.current}{letterRef.current}</h3>    
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