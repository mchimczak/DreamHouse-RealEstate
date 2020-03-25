const ESTATES_DATA = require('../DUMMY_DATA/EstatesData');
const USER_LIKES = require('../DUMMY_DATA/UserLikes');

const httpError = require('../models/http-error');

const getEstates = (req, res, next) => {
    res.json({
        estatesData: ESTATES_DATA,
        userLikes: USER_LIKES
    });
};

const getEstateById = (req, res, next) => {
    const estateId = req.params.estateId;
    const currentEstate = ESTATES_DATA.find( estate => estate.id === estateId);

    if(!currentEstate) return next(new httpError('No user found', 404));

    res.json(currentEstate);
};

exports.getEstates = getEstates;
exports.getEstateById = getEstateById;