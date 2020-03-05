import React, { useState, useEffect } from 'react';
import uuid from 'uuid';
import moment from 'moment';

export const UserContext = React.createContext();

export const UserContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    const [usersList, setUsersList] = useState([
        { id: 'u1', name: 'Jackie', email: 'jackie@img.com', phone: '333444555', estates: '5'},
        { id: 'u2', name: 'Andy', email: 'andyimg@email.com', phone: '333444555', estates: '7'}
    ]);


    console.log(usersList);

    const register = async (user) => {
        const timeStamp = new Date();
        const newUser = {
            id: uuid(),
            createdAt: moment(timeStamp).format('YYYY-MM-DD'),
            ...user
        }
        await setUserData(newUser);
        await setUsersList(prevList => ([
            newUser,
            ...prevList
        ]));
        setIsLoggedIn(true);
    };

    const login = async () => {
        await setIsLoggedIn(true);
        console.log(isLoggedIn);
    };
    const logout = async () => {
        await setIsLoggedIn(false);
        console.log(isLoggedIn);
    };


    const value = {
        isLoggedIn,
        userData,
        usersList,
        login,
        logout,
        register
    };

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )

};