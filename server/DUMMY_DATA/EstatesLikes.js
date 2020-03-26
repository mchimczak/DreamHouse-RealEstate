const ESTATES_LIKES = [
    {
        estateId: "1",
        likes: ["2", "1"]
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

const addNewEstatesLikesItem = (estateId) => {
    return ESTATES_LIKES.push({
        estateId,
        likes: []
    });
};

// module.exports = ESTATES_LIKES;
exports.ESTATES_LIKES = ESTATES_LIKES;
exports.addNewEstatesLikesItem = addNewEstatesLikesItem;
