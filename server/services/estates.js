const {getEstates, addNewEstate, getEstateById, editEstate, deleteEstate} = require('../DUMMY_DATA/EstatesData');
const {getEstatesLikes, addNewEstatesLikesItem, deleteEstatesLikesItem, likeEstate} = require('../DUMMY_DATA/EstatesLikes');

const httpError = require('../models/http-error');

const getEstatesHandler = (req, res, next) => {
    const estatesData = getEstates();
    const estatesLikes = getEstatesLikes();
    if(!estatesData) return next(new httpError('No estates found', 404));

    return res.json({
        estatesData,
        estatesLikes
    });
};

const getEstateByIdHandler = (req, res, next) => {
    const estateId = req.params.estateId;
    const currentEstate = getEstateById(estateId);
    if(!currentEstate) return next(new httpError('No estate found', 404));

    return res.json(currentEstate);
};

const editEstateHandler = async(req, res, next) => {
    const estateId = req.body.id;
    const estateUpdates = req.body.updates;
    const isUpdated = editEstate(estateId, estateUpdates);
    if(!isUpdated) return next(new httpError('No estate found', 404));

    return res.json({ message: 'Estate info updated'});
};

const addNewEstateHandler = async(req, res, next) => {
    const newEstate = req.body;
    addNewEstate(newEstate);
    addNewEstatesLikesItem(newEstate.id);
    return res.status(201).json({ message: 'New estate added'});
};

const deleteEstateHandler = async(req, res, next) => {
    const estateId = req.params.estateId;
    deleteEstatesLikesItem(estateId);
    const isDeleted = deleteEstate(estateId);
    if(!isDeleted) return next(new httpError('No estate found', 404));

    return res.status(200).json({ message: 'Estate deleted'});
};

const likeEstateHandler = async(req, res, next) => {
    const {estateId, userId} = req.body;
    const isLiked = likeEstate(estateId, userId);
    console.log(isLiked);
    if(!isLiked) return next(new httpError('No estate found', 404));

    return res.status(200).json({ message: 'You liked that'});
}


module.exports = {
    getEstatesHandler,
    getEstateByIdHandler,
    editEstateHandler,
    addNewEstateHandler,
    deleteEstateHandler,
    likeEstateHandler
}