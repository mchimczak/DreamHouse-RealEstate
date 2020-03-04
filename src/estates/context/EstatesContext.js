import React, { useReducer, useMemo} from 'react';

import { reducer, addEstate, removeEstate, editEstate } from './EstatesActions';

export const EstatesContext = React.createContext();

export const EstatesContextProvider = (props) => {

    // const reducer = (state, action) => {
    //     switch (action.type) {
    //         case 'ADD_ESTATE':
    //             return [...state, action.estate]
    //         case 'EDIT_ESTATE':
    //             return state.map(estate => {
    //                 if(estate.id === action.id) {
    //                     return {
    //                         ...estate,
    //                         ...action.updates
    //                     }
    //                 } else {
    //                     return estate;
    //                 }
    //             });
    //         case 'REMOVE_ESTATE':
    //             return state.filter(el => el.id !== action.id)
    //         default:
    //             return state;
    //     }
    // }

    // const [estates, setEstates] = useState(EstatesListData);
    const [state, dispatch] = useReducer(reducer, EstatesListData);

    // const createEstate = (newEstate) => {
    //     return setEstates(currentEstates => currentEstates.concat(newEstate))
    // };

    const startAddEstate = (newEstate) => {
        return dispatch(addEstate(newEstate));
    };
    const startRemoveEstate = (estate) => {
        return dispatch(removeEstate(estate));
    };
    const startEditEstate = (id, updates) => {
        return dispatch(editEstate(id, updates))
    }

    const value = useMemo(() => ({
        estatesData: state,
        addEstate: startAddEstate,
        removeEstate: startRemoveEstate,
        editEstate: startEditEstate
    }), [state]);

    return (
        <EstatesContext.Provider
            //value={{
                //createEstate: createEstate,
                //estatesData: state,
                //addEstate: startAddEstate,
                //removeEstate: startRemoveEstate,
                //editEstate: startEditEstate

            //}}
            value={value}
        >
            {props.children}
        </EstatesContext.Provider>
    )

};



export const EstatesListData = [
    {
        id: '1',
        title: 'Londyn mansion',
        description: 'Big house nearby the river',
        city: 'London',
        address: 'St Patrick 34.12',
        area: '235',
        price: '234999',
        rooms: '3',
        year: '2005',
        file: [],
        createdAt: '2000-11-21',
        creator: 'u1'
    },
    {
        id: '57362',
        title: 'PEKIN',
        description: 'SYRENKA HEHE',
        city: 'Warszawa',
        address: 'Zielona 6/3',
        area: '235',
        price: '50076',
        rooms: '6',
        year: '2009',
        file: [],
        createdAt: '2000-11-21',
        creator: 'u1'
    },
    {
        id: '2',
        title: 'New york mansion',
        description: 'shithole but cool',
        city: 'New york',
        address: 'hollywood 3',
        area: '125',
        price: '23999',
        rooms: '1',
        year: '2015',
        file: [],
        createdAt: '2000-11-21',
        creator: 'u2'
    }
];

