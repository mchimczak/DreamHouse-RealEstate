const ESTATES_LIKES = [
    {
        estateId: "1",
        likes: ["2", '1']
    },
    {
        estateId: "57362",
        likes: ["zyx"]
    },
    {
        estateId: '2',
        likes: []
    }
];

const getEstatesLikes = () => {
    return ESTATES_LIKES;
}

const addNewEstatesLikesItem = (estateId) => {
    return ESTATES_LIKES.push({
        estateId,
        likes: []
    });
};

const deleteEstatesLikesItem = (estateId) => {
    const isDeleted = ESTATES_LIKES.find( (estate, index )=> {
        if(estate.estateId === estateId) {
            return ESTATES_LIKES.splice(1, index);
        }
    });
    return !!isDeleted;
};

const getEstatesByOwner = (estateList) => {
    return getEstatesLikes().filter( el => estateList.includes(el.estateId));
};

const likeEstate = (estateId, userId) => {
    const newLike =  getEstatesLikes().find((estate, index) => {
        if(estate.estateId === estateId) {
            const updatedEstate =  {
                ...estate,
                likes: [...estate.likes, userId]
            };
            return ESTATES_LIKES.splice(index, 1, updatedEstate);
        }
    });
    return newLike;
};

module.exports = {
    getEstatesLikes,
    addNewEstatesLikesItem,
    deleteEstatesLikesItem,
    getEstatesByOwner,
    likeEstate
};
// exports.ESTATES_LIKES = ESTATES_LIKES;
// exports.addNewEstatesLikesItem = addNewEstatesLikesItem;
