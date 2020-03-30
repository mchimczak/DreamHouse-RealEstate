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

        axios.post('http://localhost:5000/signup', {
            ...newUser
        }).then( res => {
            setUserData(newUser);
            setIsLoggedIn(true);
            setStatus(res.data.message);
            }).catch( err => setStatus(err.response.data.message));
    };

    const login = async (val) => {
        await axios.post('http://localhost:5000/login', {
            email: val.email,
            password: val.password
        }).then( res => {
            const { user, message } = res.data;
            setUserData(user);
            setIsLoggedIn(true);
            return setStatus(message);
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
        }));

        axios.patch(`http://localhost:5000/users/me/${id}`, { ...userData, ...updates })
            .then( res => setStatus('Profile updated.'))
            .catch (err => setStatus(err.response.data.message));
    };


    const value = {
        userList: [usersList, setUsersList],
        status: [status, setStatus],
        isLoggedIn,
        userData,
        updateUser,
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