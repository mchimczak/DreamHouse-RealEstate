const {getEstates, getEstateListByOwnerId, editEstate} = require('../../estates/DUMMY_DATA/EstatesData');
const {getEstatesLikes, getEstatesByOwner} = require('../../estates/DUMMY_DATA/EstatesLikes');
const {getUsersList, getUserById, addNewUser, updateUserData, findUserByProp} = require('../DUMMY_DATA/UsersList');

const httpError = require('../../../models/http-error');

const getUsersHandler = (req, res, next) => {
    const estatesData = getEstates();
    const userList = getUsersList();
    res.json({
        userList,
        estatesData
    });
};

const getUserByIdHandler = async(req, res, next) => {
    const userId = req.params.id;

    const isUser = await getUserById(userId);
    if(!isUser) return next(new httpError('No user found', 404));

    const userEstates = await getEstateListByOwnerId(userId);
    let arr = [];
    userEstates.map(el => arr.push(el.id));
    const userLikes = await getEstatesByOwner(arr);

    res.json({
        userEstates,
        userLikes
    });
};

const addNewUserHandler = (userData) => {
    const isUser = findUserByProp('email', userData);
    if(isUser) return false;

    return addNewUser(userData);
};

const updateUserDataHandler = (req, res, next) => {
    const updatedUser = req.body;
    const isUser = updateUserData(updatedUser);
    if(!isUser) return next(new httpError('Something went wrong', 404));

    if(updatedUser.phone !== isUser.phone) {
        const userEstates = getEstateListByOwnerId(updatedUser.id);
        userEstates.map( estate => editEstate(estate.id, {phone: updatedUser.phone}))
    }

    res.json({ message: 'Profile updated' });
};

// exports.getUsersHandler = getUsersHandler;
// exports.getUserByIdHandler = getUserByIdHandler;
// exports.updateUserDataHandler = updateUserDataHandler;
// exports.addNewUserHandler = addNewUserHandler;

module.exports = {
    getUsersHandler,
    getUserByIdHandler,
    updateUserDataHandler,
    addNewUserHandler
}