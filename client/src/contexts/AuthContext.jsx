import React, { createContext, useState } from 'react'

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const [authUser, setAuthUser] = useState({})
    const [isAdmin, setIsAdmin] = useState(false)
    const [isManager, setIsManager] = useState(false)
    const [isLogged, setIsLogged] = useState(false)


    const value = {
        authUser, setAuthUser,
        isAdmin, setIsAdmin,
        isManager, setIsManager,
        isLogged, setIsLogged
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}
