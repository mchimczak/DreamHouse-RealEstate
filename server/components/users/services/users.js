const {getEstates, getEstateListByOwnerId, editEstate} = require('../../estates/DUMMY_DATA/EstatesData');
const {getEstatesLikes, getEstatesByOwner} = require('../../estates/DUMMY_DATA/EstatesLikes');
const {getUsersList, getUserById, addNewUser, updateUserData, findUserByProp} = require('../DUMMY_DATA/UsersList');

const moment = require('moment');

const User = require('../models/user');
const Estate = require('../../estates/models/estate');
const EstateLikes = require('../../estates/models/estateLikes');

const httpError = require('../../../models/http-error');

const getUsersHandler = async (req, res, next) => {
    let estatesData, userList;
    try {
        estatesData = await Estate.find({});
        userList = await User.find({});
    } catch (err) { return next(new httpError('getUserByIdHandler went wrong', 500)) }
    res.json({
        userList: userList.map( user => user.toObject({ getters: true})),
        estatesData: estatesData.map(estate => estate.toObject({ getters: true}))
    });
};

const getUserByIdHandler = async(req, res, next) => {
    const userId = req.params.id;
    let isUser, userEstates, userLikes;

    try {
        isUser = await User.findById(userId)
    } catch (err) { return next(new httpError('getUserByIdHandler went wrong', 500)) }

    if(!isUser) return next(new httpError('No user found', 404));

    try {
        userEstates = await Estate.find({ owner: userId});
        let arr = [];
        userEstates.map(el => arr.push(el.id));
        userLikes = await EstateLikes.find({ estateId: { "$in": [...arr] } })
    } catch (err) { return next(new httpError('getUserByIdHandler went wrong', 500)) }

    res.json({
        userEstates: userEstates.map(estate => estate.toObject({ getters: true})),
        userLikes: userLikes.map(userLike => userLike.toObject({ getters: true}))
    });
};

const addNewUserHandler = async (userData) => {
    // const isUser = findUserByProp('email', userData);
    let isUser, newUser;
    try {
        isUser = await User.findOne({ email: userData.email })
        console.log(isUser);
    } catch (err) { return next(new httpError('addNewUserHandler went wrong', 500)) }
    
    if(isUser) throw new Error;

    try {
        const timeStamp = new Date();
        const createUser = new User ({
            createdAt: moment(timeStamp).format('YYYY-MM-DD'),
            ...userData
        });
        newUser = await createUser.save(function(err, user) {
            if(err) return 'Error on returning an user'
            return user
        })
    } catch (err) { return new httpError('Something went wrong', 500) }

    // return addNewUser(userData);
    return newUser
};

const updateUserDataHandler = async (req, res, next) => {
    const {id, ...updatedUser} = req.body;
    let isUser;
    try {
        isUser = await User.findOneAndUpdate(id, updatedUser);
        if(!isUser) return next(new httpError('Something went wrong', 404));
    } catch (err) { return new httpError('Something went wrong', 500) }

    if(updatedUser.phone !== isUser.phone) {
        try {
            await Estate.updateMany({owner: id}, {phone: updatedUser.phone});
        }catch (err) { return new httpError('Something went wrong', 500) }
    }

    res.json({ message: 'Profile updated' });
};

module.exports = {
    getUsersHandler,
    getUserByIdHandler,
    updateUserDataHandler,
    addNewUserHandler
}