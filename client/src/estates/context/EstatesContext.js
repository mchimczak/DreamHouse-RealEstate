import React, { useReducer, useState, useContext} from 'react';
import axios from 'axios';

import { reducer, addEstate, removeEstate, editEstate } from './EstatesActions';
import { UserContext } from '../../auth/context/UserContext';

export const EstatesContext = React.createContext();

export const EstatesContextProvider = (props) => {

    const [state, dispatch] = useReducer(reducer, []);
    // const [state, dispatch] = useReducer(reducer, EstatesListData);
    const [estatesLikes, setEstatesLikes]= useState([]);

    const {status: [, setStatus]} = useContext(UserContext);
    

    const startAddEstate = async(newEstate) => {
        // setEstatesLikes(prevState => ([
        //     ...prevState,
        //         {
        //             estateId: newEstate.id,
        //             likes: []
        //         }
        // ]));
        await axios.post('http://localhost:5000/estates/new', { ...newEstate })
                    .then((res) => {
                        setStatus(res.data.message);
                    });
                    // .then(() => {
                    //     return dispatch(addEstate(newEstate));
                    // })
    };

    const startRemoveEstate = async (estateId) => {
        await axios.delete(`http://localhost:5000/estates/${estateId}`)
                    .then((res) => {
                        setStatus(res.data.message);
                    });

        // const updateList = estatesLikes.filter( el => {
        //     return el.estateId !== estateId
        // })
        // setEstatesLikes(updateList);
        return dispatch(removeEstate(estateId));
    };

    const startEditEstate = async(id, updates) => {
        axios.patch(`http://localhost:5000/estates/${id}`, {id, updates})
                .then((res) => {
                    setStatus(res.data.message);
                });
        // return dispatch(editEstate(id, updates))
    };


    const addLike = (estateId, userId) => {
        const updatedList = estatesLikes.map(estate => {
            if (estate.estateId === estateId) {
            return {
                ...estate,
                likes: [...estate.likes, userId]
            };
            } else return {...estate};
        });

        return setEstatesLikes(updatedList);
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

