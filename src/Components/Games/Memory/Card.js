import React, {useState, useEffect} from 'react'

const Card = (props) => {
    const [active, setActive] = useState('')
    const [hidden, setHidden] = useState('')


    useEffect(() => {
        setHidden(props.hide)
    },[props.hide])

    useEffect(() => {
        setActive('')
    },[props.deactivate])


    return(

        <div className={`card ${props.color} ${active} ${hidden}`}
        onClick={() => {
            setActive('selected')
            props.setSelected(props.selected.push(props.index))
        }}>
        </div>
        
    )
}

export default Card