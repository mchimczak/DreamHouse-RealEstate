// import uuid from 'uuid';

export const addEstate = (estate) => ({
    type: 'ADD_ESTATE',
    estate
});

export const editEstate = (id, updates) => ({
    type: 'EDIT_ESTATE',
    id,
    updates
});

export const removeEstate = ({ id }) => ({
    type: 'REMOVE_ESTATE',
    id
});

export const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ESTATE':
            return [...state, action.estate]
        case 'EDIT_ESTATE':
            return state.map(estate => {
                if(estate.id === action.id) {
                    return {
                        ...estate,
                        ...action.updates
                    }
                } else {
                    return estate;
                }
            });
        case 'REMOVE_ESTATE':
            return state.filter(el => el.id !== action.id)
        default:
            return state;
    }
}