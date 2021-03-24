import axios from 'axios';
import React, {createContext, useState} from 'react'
export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({
        username: null,
        firstName: null,
        lastName: null,
        email: null,
        loggedIn: false
    })

    const [stats, setStats] = useState([])
    const [memoryStat, setMemoryStat] = useState(0)
    const [mathStat, setMathStat] = useState(0)
    const [speedStat, setSpeedStat] = useState(0)
    const [recommended, setRecommended] = useState([])
    
        const getRecommendedGames = () => {
            axios.get('/api/games/recommended').then(res => {
                setRecommended(res.data);
            }).catch(err => console.log(err));
        }

    return(
        <UserContext.Provider value={{user, setUser, getRecommendedGames, recommended, stats, setStats, mathStat, setMathStat, speedStat, setSpeedStat, memoryStat, setMemoryStat}}>
            {children}
        </UserContext.Provider>
    )
} 