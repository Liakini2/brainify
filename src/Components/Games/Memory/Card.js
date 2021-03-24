import React, {useState, useEffect} from 'react'

const Card = (props) => {
    const [hidden, setHidden] = useState('')


    useEffect(() => {
        setHidden(props.hide)
    },[props.hide])

    useEffect(() => {
        setHidden('')
    },[props.active])

    
    return(
        
        <div className={`card ${hidden} ${props.color} ${props.active}`}
        onClick={() => {
            props.selectedFunc(props.index)
        }}>
        </div>
        
    )
}

export default Card