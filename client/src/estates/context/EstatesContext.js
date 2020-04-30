import React, { useReducer, useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { reducer, removeEstate } from './EstatesActions';
import { UserContext } from '../../auth/context/UserContext';

export const EstatesContext = React.createContext();

export const EstatesContextProvider = (props) => {

    const [state, dispatch] = useReducer(reducer, []);
    const [estatesLikes, setEstatesLikes]= useState([]);
    const {status: [, setStatus], token: [token, ]} = useContext(UserContext);

    const convertToFormData = useCallback((data) => {
        const formData = new FormData();

        const handleFilesArray = (filesArray) => {
            for (var i = 0; i < filesArray.length; i++) {
                formData.append('file', filesArray[i], filesArray[i].name)
            }
        };

        Object.keys(data).map( field => {
            return data[field] instanceof FileList || data[field] instanceof Array
                ? handleFilesArray(data[field])
                : formData.append(field, data[field])
        });

        return formData
    },[]);
    
    const startAddEstate = useCallback(async(newEstate) => {
        const formData = convertToFormData(newEstate);

        await axios({
             method: 'post',
             url: 'http://localhost:5000/estates/new',
             data: formData,
             headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setStatus(res.data.message);
        }).catch( err => setStatus(err.response.data.message));
    },[token]);

    const startRemoveEstate = useCallback(async(estateId) => {
        await axios.delete(`http://localhost:5000/estates/${estateId}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            setStatus(res.data.message);
            dispatch(removeEstate(estateId))
        }).catch( err => setStatus(err.response.data.message));
    },[token]);

    const startEditEstate = useCallback(async(id, updates) => {
        const newData = convertToFormData(updates);
        newData.append('id', id);

        const newEstate = await axios({
            method: 'post',
            url: `http://localhost:5000/estates/${id}`,
            data: newData,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setStatus(res.data.message);
            return res.data.estate
        }).catch( err => setStatus(err.response.data.message));

        return newEstate;
    },[token]);

    const addLike = useCallback(async(estateId, userId) => {
        await axios({
            method: 'post',
            url: `http://localhost:5000/estates/${estateId}/like`, 
            data: {estateId}, 
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            const updatedList = estatesLikes.map(estate => {
                if (estate.estateId === estateId) {
                return {
                    ...estate,
                    likes: [...estate.likes, userId]
                };
                } else return {...estate};
            });
    
            setEstatesLikes(updatedList);
            setStatus(res.data.message);
        }).catch( err => setStatus(err.response.data.message));
    },[token, estatesLikes]);

    const value = {
        estatesData: [state, dispatch],
        addEstate: startAddEstate,
        removeEstate: startRemoveEstate,
        editEstate: startEditEstate,
        addLike,
        estatesLikes: [estatesLikes, setEstatesLikes]
    };

    return (
        <EstatesContext.Provider value={value} >
            {props.children}
        </EstatesContext.Provider>
    )

};

EstatesContextProvider.propTypes = {
    children: PropTypes.any.isRequired
  };
