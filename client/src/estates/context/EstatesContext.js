import React, { useReducer, useState, useContext } from 'react';
import axios from 'axios';

import { reducer, addEstate, removeEstate, editEstate } from './EstatesActions';
import { UserContext } from '../../auth/context/UserContext';

export const EstatesContext = React.createContext();

export const EstatesContextProvider = (props) => {

    const [state, dispatch] = useReducer(reducer, []);
    const [estatesLikes, setEstatesLikes]= useState([]);
    const {status: [, setStatus]} = useContext(UserContext);
    
    const startAddEstate = async(newEstate) => {
        await axios.post('http://localhost:5000/estates/new', { ...newEstate })
                    .then((res) => {
                        setStatus(res.data.message);
                    }).catch( err => setStatus(err.response.data.message));
    };

    const startRemoveEstate = async (estateId) => {
        await axios.delete(`http://localhost:5000/estates/${estateId}`)
                    .then((res) => {
                        setStatus(res.data.message);
                        dispatch(removeEstate(estateId))
                    }).catch( err => setStatus(err.response.data.message));
    };

    const startEditEstate = async(id, updates) => {
        axios.patch(`http://localhost:5000/estates/${id}`, {id, updates})
                .then((res) => {
                    setStatus(res.data.message);
                }).catch( err => setStatus(err.response.data.message));
    };

    const addLike = async(estateId, userId) => {
        await axios.post(`http://localhost:5000/estates/${estateId}/like`, {estateId, userId})
                .then((res) => {
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

    };

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

