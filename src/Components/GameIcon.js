import React from 'react'

// const GameIcon = (props) => {
const GameIcon = ({loadgame, info, ...props}) => {
    return (
        <section className='game-icon' onClick={() => loadgame(info.id, info.name, info.game_icon)}>
            {/* {info && <img className='gameIconImage' src={info.game_icon} alt={info.name} />} */}
            {info && <img className='gameIconImage' src={process.env.PUBLIC_URL + `gameIcons/${info.name}.jpg`} alt={info.name} />}
            {info && <h1 className='gameIconName'>{info.name}</h1>}
            {info && <h1 className='gameIconDescription'>{info.description}</h1>}
        </section>
    )
}

export default GameIcon
