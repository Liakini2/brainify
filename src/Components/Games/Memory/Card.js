import React, {useState, useEffect} from 'react'

const Card = (props) => {
    const [selected, setSelected] = useState('')
    const [hidden, setHidden] = useState('')



    return(
        <div className={`card ${props.color} ${selected} ${hidden}`}
        onClick={() => setSelected('selected')}>

        </div>
    )
}

export default Card