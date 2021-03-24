import React from 'react'

const GameIcon = (props) => {
    return (
        <section className='game-icon' onClick={() => props.loadgame(props.info.id, props.info.name, props.info.game_icon)}>
            {props.info && <h1>{props.info.name}</h1>}
            {props.info && <img src={props.info.game_icon} alt={props.info.name} />}
        </section>
    )
}

export default GameIcon
