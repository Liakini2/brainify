import {useEffect, useState} from 'react';
const Tile = (props) => {
    const [guessed, setGuessed] = useState(false);
    const [tileState, setTileState] = useState(false)

    useEffect(() => {
        if(props. tileSecrets.includes(props.index)){
            setTileState(true)
        }
    },[])


    return <input className={`tile ${guessed ? '' : 'guess'} ${tileState? 'active' : 'inactive'}`} 

        onClick={_ => {
            
             setGuessed(true);
             if(tileState){
                  props.guess(props.index)
             }else{
                 setTimeout(() => {
                    setGuessed(false)
                },1000)
            }
            
        }} readOnly disabled={guessed}/>

}

export default Tile;