import React, { useState } from 'react';
import axios from 'axios';

export const UserContext = React.createContext();

export const UserContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(false);
    const [userData, setUserData] = useState({});
    const [usersList, setUsersList] = useState([]);

    const register = async (user) => {
        setIsLoading(true);
        const formData = new FormData();
        Object.keys(user).map( field => {
            user[field][0] instanceof FileList || user[field][0] instanceof File
                ? formData.append(field, user[field][0], user[field][0].name) 
                : formData.append(field, user[field])
        });
        await axios({
            method: 'post',
            url: 'http://localhost:5000/signup',
            data: formData
          }).then( res => {
            const { user, message } = res.data;
            setUserData(user);
            setIsLoggedIn(true);
            setStatus(message);
            return setIsLoading(false);
        }).catch( err => setStatus(err.response.data.message), setIsLoading(false));
    };

    const login = async (val) => {
        setIsLoading(true);
        await axios.post('http://localhost:5000/login', {
            email: val.email,
            password: val.password
        }).then( res => {
            const { user, message } = res.data;
            setUserData(user);
            setIsLoggedIn(true);
            setStatus(message);
            return setIsLoading(false);
        }).catch(err => setStatus(err.response.data.message), setIsLoading(false));
    };

    const logout = (id) => {
        setUserData(id === userData.id ? {} : userData)
        setIsLoggedIn(false);
        setStatus(`See you next time ${userData.name}`);
    };

    const updateUser = async (id, updates) => {
        const formData = new FormData();
        Object.keys(updates).map( field => {
            if (!!updates[field][0] === false) return 
            updates[field][0] instanceof FileList || updates[field][0] instanceof File
                ? formData.append(field, updates[field][0], updates[field][0].name) 
                : formData.append(field, updates[field])
        });
        formData.append('id', userData.id);
         
         await axios({
             method: 'post',
             url: `http://localhost:5000/users/me/${id}`, 
             data: formData
            }).then(res => {
                setStatus(res.data.message);
                setUserData(res.data.user);
            })
            .catch(err => setStatus(err.response.data.message));
    };


    const value = {
        userList: [usersList, setUsersList],
        status: [status, setStatus],
        loading: [isLoading, setIsLoading],
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