import React from 'react'
import { useEffect, useState, createContext } from 'react'



export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {

    const [currUser, setCurrUser] = useState({})
    const [usersList, setUsersList] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)
    const [isLogged, setIsLogged] = useState(false)
    // setIsLogged(true);

    // useEffect(() => {

    // }, [])
    // const getCurrUser = async () => {
    //     try {
    //         const response = await axios.get('/curruser');
    //         const data = response.data

    //         console.log(data);

    //     } catch (error) {
    //         console.error(error);
    //         // Handle login error
    //     }
    // }

    return (
        <UserContext.Provider value={{ currUser, isAdmin, usersList, isLogged }}>
            {children}
        </UserContext.Provider>
    )
}
