import {useState} from 'react';
const Tile = (props) => {
    const [guessed, setGuessed] = useState(false);


    return <span className={`tile${guessed ? ' guess' : ''}`} onClick={_ => {
        if(!guessed) {
            setGuessed(true);
            props.guess()
        }
    }}>
    </span>
}

export default Tile;