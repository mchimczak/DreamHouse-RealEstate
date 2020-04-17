const moment = require('moment');

const User = require('../models/user');
const Estate = require('../../estates/models/estate');
const EstateLikes = require('../../estates/models/estateLikes');
const httpError = require('../../../models/http-error');

const getUsersHandler = async (req, res, next) => {
    let estatesData, userList;

    try {
        estatesData = await Estate.find({});
        userList = await User.find({}, '-password');
    } catch (err) { return next(new httpError('getUserByIdHandler went wrong', 500)) }

    res.json({
        userList: userList.map( user => user.toObject({ getters: true})),
        estatesData: estatesData.map(estate => estate.toObject({ getters: true}))
    });
};

const getUserByIdHandler = async (req, res, next) => {
    const userId = req.params.id;
    let isUser, userEstates, userLikes;

    try {
        isUser = await User.findById(userId)
    } catch (err) { return next(new httpError('Something went wrong', 500)) }

    if(!isUser) return next(new httpError('No user found', 404));

    try {
        userEstates = await Estate.find({ owner: userId});
        let arr = [];
        userEstates.map(el => arr.push(el.id));
        userLikes = await EstateLikes.find({ estateId: { "$in": [...arr] } })
    } catch (err) { return next(new httpError('Something went wrong', 500)) }

    res.json({
        userEstates: userEstates.map(estate => estate.toObject({ getters: true })),
        userLikes: userLikes.map(userLike => userLike.toObject({ getters: true }))
    });
};


const addNewUserHandler = async (req, res, next) => {
    const user = req.body;
    let isUser, newUser;

    try {
        isUser = await User.findOne({ email: user.email });
    } catch (err) { return next(new httpError('Something went wrong, please try again later', 500)) }
    
    if(isUser) return next(new httpError('This email is already taken, please try another', 422))

    try {
        const timeStamp = new Date();
        const createUser = new User ({
            createdAt: moment(timeStamp).format('YYYY-MM-DD'),
            ...user,
            file: req.files[0].path
        });
        await createUser.save().then(res => newUser = res.toObject({ getters: true }))
    } catch (err) { return new httpError('Something went wrong, please try again later', 500) }

    res.status(201).json({ user: newUser, message: `Thank you for joining in ${user.name}` })
};


const updateUserDataHandler = async (req, res, next) => {
    let {id, ...updatedUser} = req.body;
    if(req.files.length !== 0) {
        updatedUser = {...updatedUser, file: req.files[0].path}
    }
    let isUser, prevUserData;

    try {
        prevUserData = await User.findById(id);
        isUser = await User.findOneAndUpdate({_id: id}, updatedUser, {new: true});
    } catch (err) { return new httpError('Something went wrong', 500) }

    if(!isUser) return next(new httpError('Could not find the user', 404));

    if(prevUserData && prevUserData.phone !== isUser.phone) {
        try {
            await Estate.updateMany({owner: id}, {phone: isUser.phone});
        }catch (err) { return new httpError('Something went wrong', 500) }
    }

    res.json({ user: isUser.toObject({ getters: true}), message: 'Profile updated' });
};

module.exports = {
    getUsersHandler,
    getUserByIdHandler,
    updateUserDataHandler,
    addNewUserHandler
}