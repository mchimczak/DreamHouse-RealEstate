import React, { useReducer, useMemo, useState, useEffect} from 'react';

import { reducer, setEstates, addEstate, removeEstate, editEstate } from './EstatesActions';
import { useFetch } from '../../shared/customHooks/useFetch';

export const EstatesContext = React.createContext();

export const EstatesContextProvider = (props) => {

    const [state, dispatch] = useReducer(reducer, []);
    // const [state, dispatch] = useReducer(reducer, EstatesListData);
    const [estatesLikes, setEstatesLikes]= useState([]);
    

    const { estatesData, userLikes } = useFetch('http://localhost:5000');
    useEffect(() => {
        dispatch(setEstates(estatesData));
        setEstatesLikes(userLikes);
    },[estatesData]);


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


    const value = useMemo(() => ({
        estatesData: state,
        addEstate: startAddEstate,
        removeEstate: startRemoveEstate,
        editEstate: startEditEstate,
        addLike: addLike,
        estatesLikes: estatesLikes
    }), [state, estatesLikes]);

    return (
        <EstatesContext.Provider value={value} >
            {props.children}
        </EstatesContext.Provider>
    )

};

// const UserLikes = [
//     {
//         estateId: "1",
//         likes: ["2", "1"]
//     },
//     {
//         estateId: "57362",
//         likes: ["zyx"]
//     },
//     {
//         estateId: '2',
//         likes: []
//     }
// ];

// export const EstatesListData = [
//     {
//         id: '1',
//         title: 'Londyn mansion',
//         description: 'Big house nearby the river',
//         city: 'London',
//         address: 'St Patrick 34.12',
//         area: '235',
//         price: '234999',
//         rooms: '3',
//         year: '2005',
//         file: [],
//         createdAt: '2000-11-21',
//         owner: 'u1'
//     },
//     {
//         id: '57362',
//         title: 'PEKIN',
//         description: 'SYRENKA HEHE',
//         city: 'Warszawa',
//         address: 'Zielona 6/3',
//         area: '235',
//         price: '50076',
//         rooms: '6',
//         year: '2009',
//         file: [],
//         createdAt: '2000-11-21',
//         owner: 'u1'
//     },
//     {
//         id: '2',
//         title: 'New york mansion',
//         description: 'shithole but cool',
//         city: 'New york',
//         address: 'hollywood 3',
//         area: '125',
//         price: '23999',
//         rooms: '1',
//         year: '2015',
//         file: [],
//         createdAt: '2000-11-21',
//         owner: 'u2'
//     }
// ];

