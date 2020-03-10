import React, { useState } from 'react';
import uuid from 'uuid';
import moment from 'moment';

export const UserContext = React.createContext();

export const UserContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [status, setStatus] = useState(false);
    const [userData, setUserData] = useState({});
    const [usersList, setUsersList] = useState([
        { id: 'u1', name: 'Jackie', email: 'jackie@img.com', password: 'aaabbbc', phone: '333444555', estates: '5'},
        { id: 'u2', name: 'Andy', email: 'andyimg@email.com', password: 'aaabbbc', phone: '333444555', estates: '7'}
    ]);


    // console.log(usersList);

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
        setStatus(`Thank you for joining in ${user.name}`);
    };

    const login = async (val) => {
        const user = usersList.find( el => {
            return el.email === val.email && el.password === val.password
        });
        if(user) {
            await setUserData(user);
            setIsLoggedIn(true);
            setStatus(`Welcome back ${user.name}`)
        } else {
            setStatus('Cannot log in, please check your email and password');
        }
    };
    const logout = async (id) => {
        await setUserData(id === userData.id ? {} : userData)
        setIsLoggedIn(false);
        setStatus(`See you next time ${userData.name}`);
    };

    const updateUser = async (id, updates) => {
        const updatedUserList = usersList.map( user => {
            if(user.id === id) {
                return {
                    ...user,
                    ...updates
                }
            } else {
                return user
            }
        });
        await setUsersList(updatedUserList);
        setStatus('Your profile information was updated successfully.')
    };


    const value = {
        isLoggedIn,
        userData,
        usersList,
        updateUser,
        status,
        setStatus,
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