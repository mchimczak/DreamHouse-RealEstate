const httpError = require('../../../models/http-error');
const EstateLikes = require('../../estates/models/estateLikes');
const Estate = require('../../estates/models/estate');

module.exports = findMostLikedEstates = async(req, res, next) => {
    const bestThreeEstate = [];
    let mostLikedEstates;

    try {
        mostLikedEstates = await EstateLikes.find({}).limit(3).sort({ likes: -1})
        const estateList = await Estate.find({})
        estateList.map( estate => {
            return mostLikedEstates.forEach( (obj, index) => {
                if(estate.id === obj.estateId) {
                    return bestThreeEstate.splice(index, 0, estate)
                }
            })
        });
    } catch(err) { return next(new httpError('Something went wrong', 500)) }

    if(!bestThreeEstate) return next(new httpError('No estates found', 404));

    res.json({ 
        bestThreeEstate : bestThreeEstate.map(estateLikes => estateLikes.toObject({ getters: true})),
        mostLikedEstates: mostLikedEstates.map(estateLikes => estateLikes.toObject({ getters: true}))
    });
}