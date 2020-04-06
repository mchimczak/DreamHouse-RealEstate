const {getEstates} = require('../../estates/DUMMY_DATA/EstatesData');
const {getEstatesLikes} = require('../../estates/DUMMY_DATA/EstatesLikes');

const httpError = require('../../../models/http-error');
const EstateLikes = require('../../estates/models/estateLikes');
const Estate = require('../../estates/models/estate');

module.exports = findMostLikedEstates = async(req, res, next) => {
    const bestThreeEstate = [];
    let mostLikedEstates;
    try {
        mostLikedEstates = await EstateLikes.find({})
        mostLikedEstates.sort( (a, b) => {
            return b.likes.length - a.likes.length
        }).slice(0, 3);
        const estateList = await Estate.find({})
        estateList.map( estate => {
            return mostLikedEstates.forEach( (obj, index) => {
                if(estate.id === obj.estateId) {
                    return bestThreeEstate.splice(index, 0, estate)
                }
            })
        });

    } catch(err) { return next(new httpError('Something went wrong', 500)) }
    // const bestThreeEstate = [];
    // const mostLikedEstates = getEstatesLikes().sort( (a, b) => {
    //     return b.likes.length - a.likes.length
    // }).slice(0, 3);
    // getEstates().map( estate => {
    //     return mostLikedEstates.forEach( (obj, index) => {
    //         if(estate.id === obj.estateId) {
    //             return bestThreeEstate.splice(index, 0, estate)
    //         }
    //     })
    // });

    if(!bestThreeEstate) return next(new httpError('Sth went wrong', 404));

    res.json({ 
        bestThreeEstate : bestThreeEstate.map(estateLikes => estateLikes.toObject({ getters: true})),
        mostLikedEstates: mostLikedEstates.map(estateLikes => estateLikes.toObject({ getters: true}))
    });
}