import React, { useState } from 'react';
import axios from 'axios';

export const UserContext = React.createContext();

export const UserContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(false);
    const [userData, setUserData] = useState({});
    const [usersList, setUsersList] = useState([]);
    const [token, setToken] = useState(false);

    const convertToFormData = (data) => {
        const formData = new FormData();

        const handleFilesArray = (filesArray) => {
            for (var i = 0; i < filesArray.length; i++) {
                formData.append('file', filesArray[i], filesArray[i].name)
            }
        };

        Object.keys(data).map( field => {
            return data[field][0] instanceof FileList || data[field] instanceof Array
                ? handleFilesArray(data[field])
                : formData.append(field, data[field])
        });

        return formData
    };

    const register = async (user) => {
        setIsLoading(true);
        const formData = convertToFormData(user);
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
            const { user, message, token } = res.data;
            setUserData(user);
            setIsLoggedIn(true);
            setStatus(message);
            setToken(token);
            return setIsLoading(false);
        }).catch(err => setStatus(err.response.data.message), setIsLoading(false));
    };

    const logout = (id) => {
        setUserData(id === userData.id ? {} : userData)
        setIsLoggedIn(false);
        setToken(false);
        return setStatus(`See you next time ${userData.name}`);
    };

    const updateUser = async (id, updates) => {
        const formData = convertToFormData(updates);
        formData.append('id', userData.id);
         
        await axios({
            method: 'post',
            url: `http://localhost:5000/users/me/${id}`, 
            data: formData,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            setStatus(res.data.message);
            setUserData(res.data.user);
        }).catch(err => setStatus(err.response.data.message));
    };


    const value = {
        userList: [usersList, setUsersList],
        status: [status, setStatus],
        loading: [isLoading, setIsLoading],
        token: [token, setToken],
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