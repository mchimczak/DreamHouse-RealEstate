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
        if(data.length = 0) return;

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
        if(!newEstate || typeof newEstate !== 'object') return 

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
        if(!estateId || typeof estateId !== 'string') return 

        await axios.delete(`http://localhost:5000/estates/${estateId}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            setStatus(res.data.message);
            dispatch(removeEstate(estateId))
        }).catch( err => setStatus(err.response.data.message));
    },[token]);

    const startEditEstate = useCallback(async(id, updates) => {
        if(!id || typeof id !== 'string' || !updates || typeof updates !== 'object') return

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
        if(!estateId || typeof estateId !== 'string' || !userId || typeof userId !== 'string') return

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
