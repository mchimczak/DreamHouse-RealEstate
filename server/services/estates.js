const {getEstates, addNewEstate, getEstateById, editEstate, deleteEstate} = require('../DUMMY_DATA/EstatesData');
const {ESTATES_LIKES, addNewEstatesLikesItem} = require('../DUMMY_DATA/EstatesLikes');

const httpError = require('../models/http-error');

const getEstatesHandler = (req, res, next) => {
    const estatesData = getEstates();
    if(!estatesData) return next(new httpError('No user found', 404));

    return res.json({
        estatesData,
        estatesLikes: ESTATES_LIKES
    });
};

const getEstateByIdHandler = (req, res, next) => {
    const estateId = req.params.estateId;
    const currentEstate = getEstateById(estateId);
    if(!currentEstate) return next(new httpError('No user found', 404));

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
    const isDeleted = deleteEstate(estateId);
    if(!isDeleted) return next(new httpError('No estate found', 404));

    return res.status(200).json({ message: 'Estate deleted'});
};


module.exports = {
    getEstatesHandler,
    getEstateByIdHandler,
    editEstateHandler,
    addNewEstateHandler,
    deleteEstateHandler
}