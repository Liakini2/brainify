import {createContext, useState} from 'react';
export const GameContext = createContext();

export const GameProvider = ({children}) => {
    const [game, setGame] = useState({
        game_id: 0,
        game_name: ''
    })

    return(
        <GameContext.Provider value={{game, setGame}}>
            {children}
        </GameContext.Provider>
    )
}