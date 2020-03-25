const ESTATES_DATA = require('../DUMMY_DATA/EstatesData');
const USER_LIKES = require('../DUMMY_DATA/UserLikes');
const USERS_LIST = require('../DUMMY_DATA/UsersList');

const httpError = require('../models/http-error');

const getUsers = (req, res, next) => {
    res.json({
        userList: USERS_LIST,
        estatesData: ESTATES_DATA
    });
};

const getUserById = (req, res, next) => {
    const userId = req.params.id;
    const isUser = USERS_LIST.find( user => user.id === userId)
    const userEstates = ESTATES_DATA.filter( el => el.owner === userId);
    let arr = [];
    userEstates.map(el => arr.push(el.id));
    const userLikes = USER_LIKES.filter( el => arr.includes(el.estateId));

    if(!isUser) return next(new httpError('No user found', 404));
    
    res.json({
        userEstates,
        userLikes
    });
};

const updateUserById = (req, res, next) => {
    const updatedUser = req.body;
    const isUser = USERS_LIST.find( (user, index) => {
        if(user.id === updatedUser.id) {
            USERS_LIST.splice(index, 1, updatedUser)
            return true
        }
    });
    if(!isUser) return next(new httpError('Something went wrong', 404));

    res.json({ message: 'Profile updated'});
}

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.updateUserById = updateUserById;