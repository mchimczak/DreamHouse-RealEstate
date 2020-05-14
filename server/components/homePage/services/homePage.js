const httpError = require('../../../models/http-error');
const EstateLikes = require('../../estates/models/estateLikes');
const Estate = require('../../estates/models/estate');

module.exports = mostLikedPosts = async(req, res, next) => {
    const bestThreeEstate = [];
    let mostLikedEstates, estateList, sortedEstates = [];

    try {
        mostLikedEstates = await EstateLikes.aggregate([
            {
              $addFields: {  likesArrayLength: {  $size: "$likes" } }
            },
            {
              $sort: { likesArrayLength: -1 }
            }
        ]).limit(3);
        mostLikedEstates.map(el => bestThreeEstate.push(el.estateId));
        estateList = await Estate.find({ _id: { "$in": [...bestThreeEstate] } }, 'city address price title file email phone id owner');

        estateList.map( estate => {
            return mostLikedEstates.forEach( (obj, index) => {
                if(estate.id === obj.estateId) {
                    return sortedEstates.splice(index, 0, estate)
                }
            })
        });

    } catch(err) { return next(new httpError('Something went wrong', 500)) }

    if(!bestThreeEstate) return next(new httpError('No estates found', 404));

    res.json({ 
        bestThreeEstate : sortedEstates.map(estate => estate.toObject({ getters: true})),
        mostLikedEstates: mostLikedEstates
    });
};