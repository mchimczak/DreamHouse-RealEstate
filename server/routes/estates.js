const express = require('express');
const estates = express.Router();

const ESTATES_DATA = require('../DUMMY_DATA/EstatesData');
const USER_LIKES = require('../DUMMY_DATA/UserLikes');

estates.get('/', (req, res, next) => {
    res.json({
        estatesData: ESTATES_DATA,
        userLikes: USER_LIKES
    });
});


module.exports = estates;