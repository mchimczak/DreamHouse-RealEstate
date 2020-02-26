import React from 'react'

export const EstatesContext = React.createContext();

export const EstatesListData = [
    {
        id: '1',
        title: 'Londyn mansion',
        description: 'Big house nearby the river',
        image: 'kk',
        address: 'london st new one 7/2',
        location: {
            lat: 23.44556,
            lng: -34.53253
        },
        creator: 'u1'
    },
    {
        id: '57362',
        title: 'WARSZAWA',
        description: 'SYRENKA HEHE',
        image: 'kk',
        address: 'ŻOLIBOŻ 2',
        location: {
            lat: 43.44556,
            lng: -134.53253
        },
        creator: 'u1'
    },
    {
        id: '2',
        title: 'New york mansion',
        description: 'shithole',
        image: 'kk',
        address: 'new york st new two 7/2',
        location: {
            lat: 11.44556,
            lng: -94.53253
        },
        creator: 'u2'
    }
];