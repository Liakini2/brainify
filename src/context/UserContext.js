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
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
} 