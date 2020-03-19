const express = require('express');
const users = express.Router();

const USERS_LIST = require('../DUMMY_DATA/UsersList');
const ESTATES_DATA = require('../DUMMY_DATA/EstatesData');
const USER_LIKES = require('../DUMMY_DATA/UserLikes');

users.get('/', (req, res, next) => {
    res.json({
        userList: USERS_LIST,
        estatesData: ESTATES_DATA
    });
});

users.get('/:id', (req, res, next) => {
    const userId = req.params.id;
    const userEstates = ESTATES_DATA.filter( el => el.owner === userId);
    const userLikes = USER_LIKES.filter( el => el.likes.includes(userId));
    
    res.json(userEstates);
})


module.exports = users;