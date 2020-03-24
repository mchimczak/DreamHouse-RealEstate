import React, { useReducer, useState} from 'react';

import { reducer, addEstate, removeEstate, editEstate } from './EstatesActions';

export const EstatesContext = React.createContext();

export const EstatesContextProvider = (props) => {

    const [state, dispatch] = useReducer(reducer, []);
    // const [state, dispatch] = useReducer(reducer, EstatesListData);
    const [estatesLikes, setEstatesLikes]= useState([]);
    

    const startAddEstate = (newEstate) => {
        setEstatesLikes(prevState => ([
            ...prevState,
                {
                    estateId: newEstate.id,
                    likes: []
                }
        ]));

        return dispatch(addEstate(newEstate));
    };

    const startRemoveEstate = async (estate) => {
        const updateList = estatesLikes.filter( el => {
            return el.estateId !== estate.id
        })
        setEstatesLikes(updateList);
        return dispatch(removeEstate(estate));
    };

    const startEditEstate = (id, updates) => {
        return dispatch(editEstate(id, updates))
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

