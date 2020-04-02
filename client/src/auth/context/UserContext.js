import React, { useState } from 'react';
import axios from 'axios';

export const UserContext = React.createContext();

export const UserContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [status, setStatus] = useState(false);
    const [userData, setUserData] = useState({});
    const [usersList, setUsersList] = useState([]);

    const register = async (user) => {
        axios.post('http://localhost:5000/signup', {
            ...user
        }).then( res => {
            const { user, message } = res.data;
            setUserData(user);
            setIsLoggedIn(true);
            setStatus(message);
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

        axios.patch(`http://localhost:5000/users/me/${id}`, { id: userData.id, ...updates })
            .then( res => setStatus(res.data.message))
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