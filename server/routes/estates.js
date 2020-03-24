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

estates.get('/:estateId', (req, res, next) => {
    const estateId = req.params.estateId;
    const currentEstate = ESTATES_DATA.find( estate => estate.id === estateId);

    res.json(currentEstate);
});


module.exports = estates;