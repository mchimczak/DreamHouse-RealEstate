const {getEstates} = require('../DUMMY_DATA/EstatesData');
const {ESTATES_LIKES} = require('../DUMMY_DATA/EstatesLikes');
const httpError = require('../models/http-error');

module.exports = findMostLikedEstates = (req, res, next) => {
    const bestThreeEstate = [];
    const mostLikedEstates = ESTATES_LIKES.sort( (a, b) => {
        return b.likes.length - a.likes.length
    }).slice(0, 3);
    getEstates().map( estate => {
        return mostLikedEstates.forEach( (obj, index) => {
            if(estate.id === obj.estateId) {
                return bestThreeEstate.splice(index, 0, estate)
            }
        })
    });

    if(!bestThreeEstate) return next(new httpError('Sth went wrong', 404));

    res.json({ 
        bestThreeEstate,
        mostLikedEstates 
    });
}