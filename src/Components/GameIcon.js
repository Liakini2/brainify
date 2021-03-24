import React from 'react'

const GameIcon = (props) => {
    return (
        <section className='game-icon' onClick={() => props.loadgame(props.info.id, props.info.name, props.info.game_icon)}>
            
        </section>
    )
}

export default GameIcon
