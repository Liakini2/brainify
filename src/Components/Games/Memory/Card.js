import React from 'react'

const Card = (props) => {

    return(
        
        <input className={`card ${props.color} ${props.hide? 'hidden' : ''} ${props.active? 'selected' : ''}`}
        
        onClick={() => {
            if(props.selected.length < 2){
            if(props.hide === true){
                props.setHide(props.index, props.hide)
            }
            props.selectedFunc(props.index)
        }}} readOnly disabled={props.disabled}>
        </input>
        
    )

}

export default Card