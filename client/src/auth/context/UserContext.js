import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const UserContext = React.createContext();

export const UserContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(false);
    const [userData, setUserData] = useState({});
    const [usersList, setUsersList] = useState([]);
    const [token, setToken] = useState(false);
    const [tokenTTL, setTokenTTL] = useState();
    let logoutTimer;

    const convertToFormData = useCallback((data) => {
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
    },[]);


    const handleSuccesAuthorization = useCallback((serverResponse) => {
        const { user, message, token } = serverResponse;
        setUserData(user);
        setIsLoggedIn(true);
        setStatus(message);
        setToken(token);
        const tokenExpirationDate = new Date( new Date().getTime() + 1000 * 60 * 60).toISOString();
        setTokenTTL(tokenExpirationDate);
        localStorage.setItem('user', JSON.stringify({ 
            userId: user.id, 
            token: token,
            expiration: tokenExpirationDate
        }));
        return setIsLoading(false);
    },[]);

    const authUser = useCallback( async (token, expirationDate) => {
        await axios({
            method: 'post',
            url: 'http://localhost:5000/login/auth',
            headers: { Authorization: `Bearer ${token}` }
        }).then( res => {
            const { user, token } = res.data;
            setUserData(user);
            setIsLoggedIn(true);
            setToken(token);
            return localStorage.setItem('user', JSON.stringify({ 
                userId: user.id, 
                token: token,
                expiration: expirationDate
            }));
        }).catch(err => setStatus(err.response.data.message), setIsLoading(false));
    },[]);

    const register = useCallback( async (user) => {
        setIsLoading(true);
        const formData = convertToFormData(user);
        await axios({
            method: 'post',
            url: 'http://localhost:5000/signup',
            data: formData
        }).then( res => { handleSuccesAuthorization(res.data)
        }).catch( err => setStatus(err.response.data.message), setIsLoading(false));
    },[]);

    const login = useCallback( async (val) => {
        setIsLoading(true);
        await axios.post('http://localhost:5000/login', {
            email: val.email,
            password: val.password
        }).then( res => { handleSuccesAuthorization(res.data)
        }).catch(err => setStatus(err.response.data.message), setIsLoading(false));
    },[]);

    const logout = useCallback(() => {
        setStatus(`See you next time ${userData.name}`);
        setIsLoggedIn(false);
        setToken(false);
        setUserData({});
        setTokenTTL(null);
        return localStorage.removeItem('user');
    },[userData]);

    const updateUser = useCallback(async (id, updates) => {
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
    },[userData, token]);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if(storedUser && storedUser.token && new Date(storedUser.expiration) > new Date()) {
            setTokenTTL(storedUser.expiration);
            authUser(storedUser.token, storedUser.expiration)
        }

        return () => {
            setToken(false)
            setIsLoggedIn(false)
        }
    }, []);

    useEffect(() => {
        if(token && tokenTTL) {
            const tokenRemainTTL = new Date(tokenTTL).getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, tokenRemainTTL);
        } else clearTimeout(logoutTimer)

    }, [token, logout, tokenTTL]);


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

UserContextProvider.propTypes = {
    children: PropTypes.any.isRequired
  };