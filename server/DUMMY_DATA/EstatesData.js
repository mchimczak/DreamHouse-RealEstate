const ESTATES_DATA = [
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
        owner: 'u1'
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
        owner: 'u1'
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
        owner: 'u2'
    }
];

const getEstates = () => {
    return ESTATES_DATA
};

const addNewEstate = (estate) => {
    return ESTATES_DATA.push(estate)
};

const getEstateById = (estateId) => {
    return ESTATES_DATA.find( estate => estate.id === estateId);
};

const editEstate = (estateId, updates) => {
    const isUpdated = ESTATES_DATA.find((estate, index) => {
        if(estate.id === estateId) {
            const updatedEstate = {
                ...estate,
                ...updates
            }
            return ESTATES_DATA.splice(index, 1, updatedEstate);
        }
    })
    return !!isUpdated;
};

const deleteEstate = (estateId) => {
   const isDeleted = ESTATES_DATA.find((estate, index) => {
       if(estate.id === estateId) {
           return ESTATES_DATA.splice(index, 1);
       }
   });
   return !!isDeleted;
}


module.exports = {
    getEstates,
    addNewEstate,
    getEstateById,
    editEstate,
    deleteEstate
};