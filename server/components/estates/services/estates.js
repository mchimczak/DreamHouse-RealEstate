const { v4: uuid } = require('uuid');
const moment = require('moment');
const mongoose = require('mongoose');

const {getEstates, addNewEstate, getEstateById, editEstate, deleteEstate} = require('../DUMMY_DATA/EstatesData');
const {getEstatesLikes, addNewEstatesLikesItem, deleteEstatesLikesItem, likeEstate} = require('../DUMMY_DATA/EstatesLikes');

const httpError = require('../../../models/http-error');
const Estate = require('../models/estate');
const EstateLikes = require('../models/estateLikes');
const User = require('../../users/models/user');


const getEstatesHandler = async (req, res, next) => {
    let estatesData, estatesLikes;
    
    try {
        estatesData = await Estate.find({})
        estatesLikes = await EstateLikes.find({})
    } catch(err) { return next(new httpError('Something went wrong', 500)) }
    
    if(!estatesData) return next(new httpError('No estates found', 404));

    return res.json({
        estatesData: estatesData.map(estate => estate.toObject({ getters: true})),
        estatesLikes: estatesLikes.map(estateLikes => estateLikes.toObject({ getters: true}))
    });
};


const getEstateByIdHandler = async(req, res, next) => {
    const estateId = req.params.estateId;
    let currentEstate;

    try {
        currentEstate = await Estate.findById(estateId);
    } catch (err) { return next(new httpError('Something went wrong', 500)) }

    if(!currentEstate) return next(new httpError('No estate found', 404));

    return res.json(currentEstate.toObject({ getters: true}));
};


const addNewEstateHandler = async(req, res, next) => {
    let user;
    const timeStamp = new Date();
    const newEstate = new Estate ({
        createdAt: moment(timeStamp).format('YYYY-MM-DD'),
        ...req.body
    });
    const newEstateLikes = new EstateLikes({
        estateId: newEstate.id,
        likes: []
    });

    try {
        user = await User.findById(req.body.owner)
    } catch (err) { return next(new httpError('Something went wrong', 500)) }

    user ? '' : next(new httpError('Could not find creator ID. Please try again later', 500))


    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newEstate.save({ session });
        await newEstateLikes.save({ session });
        await session.commitTransaction();
    } catch (err) { return next(new httpError('Something went wrong', 500)) }

    return res.status(201).json({ message: 'New estate added'});
};


const editEstateHandler = async(req, res, next) => {
    const { id, updates } = req.body;
    let isUpdated;

    try {
        isUpdated = await Estate.findByIdAndUpdate(id, updates);
    } catch (err) { return next(new httpError('Something went wrong', 500)) }

    if(!isUpdated) return next(new httpError('No estate found', 404));

    return res.json({ message: 'Estate info updated' });
};


const deleteEstateHandler = async(req, res, next) => {
    const estateId = req.params.estateId;
    let isDeleted;

    try {
        isDeleted = await Estate.findByIdAndDelete(estateId);
        await EstateLikes.findOneAndDelete({ estateId })
    } catch (err) { return next(new httpError('Something went wrong', 500)) }

    if(!isDeleted) return next(new httpError('No estate found', 404));

    return res.status(200).json({ message: 'Estate deleted'});
};


const likeEstateHandler = async(req, res, next) => {
    const {estateId, userId} = req.body;
    let isLiked;

    try {
        isLiked = await EstateLikes.findOneAndUpdate({ estateId }, {$push: { likes: userId }});
    } catch (err) { return next(new httpError('Something went wrong', 500)) }

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