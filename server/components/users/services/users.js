const fs = require('fs');
const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Estate = require('../../estates/models/estate');
const EstateLikes = require('../../estates/models/estateLikes');
const httpError = require('../../../models/http-error');

const getUsersHandler = async (req, res, next) => {
    let estatesData, userList;

    try {
        estatesData = await Estate.find({}, 'owner');
        userList = await User.find({}, '-password -email -phone');
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
    const files = req.files;
    let isUser, newUser, hashedPassword, token, avatarImg;

    avatarImg = files && files[0] 
        ? files[0].path
        : []

    try {
        isUser = await User.findOne({ email: user.email });
    } catch (err) { return next(new httpError('Something went wrong, please try again later', 500)) }
    
    if(isUser) return next(new httpError('This email is already taken, please try another', 422))

    try {
        hashedPassword = await bcrypt.hash(user.password, 10)
    } catch (err) { return next(new httpError('Something went wrong, please try again later', 500)) }

    try {
        const timeStamp = new Date();
        const createdUser = new User ({
            createdAt: moment(timeStamp).format('YYYY-MM-DD'),
            ...user,
            password: hashedPassword,
            file: avatarImg
        });
        await createdUser.save().then(res => newUser = res.toObject({ getters: true }))
    } catch (err) { return new httpError('Something went wrong, please try again later', 500) }


    try {
        token = jwt.sign({
            userId: newUser.id,
            email: newUser.email
        }, process.env.JWT_SECRET_KEY , { expiresIn: '30min'} );

    } catch (err) { return new httpError('Something went wrong, please try again later', 500) }

    res.status(201).json({ user: newUser, token: token, message: `Thank you for joining in ${user.name}` });
};


const updateUserDataHandler = async (req, res, next) => {
    let {id, ...updatedUser} = req.body;
    let isUser, prevUserData;
    const userIdToken = req.authUser.userId;

    if(req.files && req.files.length !== 0) { updatedUser = {...updatedUser, file: req.files[0].path} };

    try {
        prevUserData = await User.findById(userIdToken);
        isUser = await User.findOneAndUpdate({_id: userIdToken}, updatedUser, {new: true});
    } catch (err) { return new httpError('Something went wrong', 500) };

    if(!isUser) return next(new httpError('Could not find the user', 404));

    if(prevUserData && prevUserData.phone !== isUser.phone) {
        try {
            await Estate.updateMany({owner: userIdToken}, {phone: isUser.phone});
        } catch (err) { return new httpError('Something went wrong', 500) }
    };

    if(prevUserData.file[0] !== isUser.file[0]) {
        prevUserData.file.forEach( file => fs.unlink(file, err => err && console.log(err)))
    };

    res.json({ user: isUser.toObject({ getters: true}), message: 'Your profile was updated successfully' });
};

module.exports = {
    getUsersHandler,
    getUserByIdHandler,
    updateUserDataHandler,
    addNewUserHandler
}