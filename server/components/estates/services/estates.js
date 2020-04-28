// const { v4: uuid } = require('uuid');
const fs = require('fs');
const moment = require('moment');
const mongoose = require('mongoose');

const httpError = require('../../../models/http-error');
const Estate = require('../models/estate');
const EstateLikes = require('../models/estateLikes');
const User = require('../../users/models/user');


const getEstatesHandler = async (req, res, next) => {
    let estatesData, estatesLikes, estatePosts = [];

    const filters = {
        limit: parseInt(req.query.limit, 10) || 0,
        sortBy: req.query.sortBy || '-createdAt',
        skip: (req.query.page - 1) * req.query.limit || 0
    }

    try {
        allPosts = await Estate.countDocuments({});

        if(allPosts < filters.skip) { filters.skip = 0 }

        estatesData = await Estate.find({}, 'city address price title file email phone id owner')
                                    .limit(filters.limit)
                                    .skip(filters.skip)
                                    .sort(filters.sortBy)
                                    .collation({ locale: 'en_US', numericOrdering: true })

        estatesData.map(el => estatePosts.push(el.id));
        estatesLikes = await EstateLikes.find({ estateId: { "$in": [...estatePosts] } });
    } catch(err) { return next(new httpError('Something went wrong', 500)) }
    
    if(!estatesData) return next(new httpError('No estates found', 404));

    return res.json({
        estatesData: estatesData.map(estate => estate.toObject({ getters: true})),
        estatesLikes: estatesLikes.map(estateLikes => estateLikes.toObject({ getters: true})),
        allPosts
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
    const userIdToken = req.authUser.userId;

    const files = req.files;
    let user, estateImages;
    if(files) estateImages = files.map( img => img.path );
    
    const timeStamp = new Date();
    const newEstate = new Estate ({
        createdAt: moment(timeStamp).format('YYYY-MM-DD'),
        ...req.body,
        owner: userIdToken,
        file: estateImages
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

    return res.status(201).json({ message: 'Your post was published successfully'});
};


const editEstateHandler = async(req, res, next) => {
    const userIdToken = req.authUser.userId;
    let { id, ...updates } = req.body;
    const files = req.files;

    let isUpdated, estateImages, prevEstateFiles, prevEstateData, removePrevImg = false;

    if(files && files.length !== 0) {
        estateImages = files.map( img => img.path );
        updates = {...updates, file: estateImages};
        removePrevImg = true;
    }

    try {
        prevEstateData = await Estate.findById(id);
        prevEstateFiles = prevEstateData.file;
    } catch (err) { return next(new httpError('Something went wrong', 500)) }

    if(prevEstateData.owner !== userIdToken) return next(new httpError('Permission denied, you are not authorized', 401));

    try {
        isUpdated = await Estate.findOneAndUpdate({_id: id}, updates, { new: true });
    } catch (err) { return next(new httpError('Something went wrong', 500)) }

    if(!isUpdated) return next(new httpError('No estate found', 404));

    if(removePrevImg) prevEstateFiles.forEach( file => fs.unlink(file, err => err && console.log(err)));

    return res.json({ estate: isUpdated.toObject({ getters: true}) , message: 'Your post was updated successfully' });
};


const deleteEstateHandler = async(req, res, next) => {
    const userIdToken = req.authUser.userId;
    const estateId = req.params.estateId;
    let isDeleted, imagesToRemove;

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        isDeleted = await Estate.findOneAndDelete({owner: userIdToken, _id: estateId});
        await EstateLikes.findOneAndDelete({ estateId });
        session.commitTransaction();
    } catch (err) { return next(new httpError('Error, you are not authorized', 401)) }

    if(!isDeleted) return next(new httpError('No estate found', 404));

    imagesToRemove = isDeleted.file;
    imagesToRemove.forEach(file => fs.unlink(file, err => err && console.log(err)));

    return res.status(200).json({ message: 'Post deleted successfully'});
};


const likeEstateHandler = async(req, res, next) => {
    const userIdToken = req.authUser.userId;
    const { estateId } = req.body;
    let isLiked;

    try {
        isLiked = await EstateLikes.findOneAndUpdate({ estateId }, {$push: { likes: userIdToken }});
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