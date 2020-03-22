import React, { useState } from 'react';
import uuid from 'uuid';
import moment from 'moment';
import axios from 'axios';

export const UserContext = React.createContext();

export const UserContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [status, setStatus] = useState(false);
    const [userData, setUserData] = useState({});
    const [usersList, setUsersList] = useState([]);

    const register = async (user) => {
        const timeStamp = new Date();
        const newUser = {
            id: uuid(),
            createdAt: moment(timeStamp).format('YYYY-MM-DD'),
            ...user
        }
        console.log(newUser)

        axios.post('http://localhost:5000/signup', {
            ...newUser
        }).then( res => {
            console.log(res)
            setUserData(newUser);
            setIsLoggedIn(true);
            setStatus(`Thank you for joining in ${newUser.name}`);
        }).catch( err => setStatus(err.response.data.message));

        // await setUsersList(prevList => ([
        //     newUser,
        //     ...prevList
        // ]));
    };

    const login = async (val) => {
        await axios.post('http://localhost:5000/login', {
            email: val.email,
            password: val.password
        }).then( res => {
            const { user } = res.data;
            setUserData(user);
            setIsLoggedIn(true);
            setStatus(`Welcome back ${user.name}`)
        })
        .catch(err => setStatus(err.response.data.message));
    };

    const logout = async (id) => {
        await setUserData(id === userData.id ? {} : userData)
        setIsLoggedIn(false);
        setStatus(`See you next time ${userData.name}`);
    };

    const updateUser = async (id, updates) => {
        await setUserData(prevState => ({
            ...prevState,
            ...updates
        }))
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
        setStatus('Your profile was updated successfully.')
    };


    const value = {
        setUsersList,
        isLoggedIn,
        userData,
        usersList,
        updateUser,
        status,
        setStatus,
        login,
        logout,
        register,
    };

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )

};