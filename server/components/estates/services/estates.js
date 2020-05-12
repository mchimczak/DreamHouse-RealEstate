'use strict'
const fs = require('fs');
const fsPromise = fs.promises;
const moment = require('moment');
const mongoose = require('mongoose');

const httpError = require('../../../models/http-error');
const Estate = require('../models/estate');
const EstateLikes = require('../models/estateLikes');
const User = require('../../users/models/user');


const getEstatesHandler = async (req, res, next) => {
    let allPosts, estatesData, estatesLikes, estatePosts = [];

    const filters = {
        limit: +req.query.limit || 0,
        sortBy: req.query.sortBy || '-createdAt',
        skip: (req.query.page - 1) * req.query.limit || 0,
        text: req.query.text || undefined
    }

    const modelKeys = Object.keys(Estate.schema.paths);
    const normalizeSortBy = filters.sortBy.replace(/^-/, '');
    if(!modelKeys.includes(normalizeSortBy)) return next(new httpError('Invalid query params', 500))
    
    try {
        allPosts = await Estate.countDocuments({});
        if(allPosts < filters.skip) { filters.skip = 0 }
        
        const filterQuery = filters.text ? {title: new RegExp(`${filters.text}`, "gi")} : null
        if(filterQuery) { filters.skip = 0 }
        
        estatesData = await Estate.find(filterQuery || {}, 'city address price title file email phone id owner')
                                    .limit(filters.limit)
                                    .skip(filters.skip)
                                    .sort(filters.sortBy)
                                    .collation({ locale: 'en_US', numericOrdering: true })

        if(filterQuery) { allPosts = estatesData.length }

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

    const files = req.files || [];
    let user;
    
    const timeStamp = new Date();
    const newEstate = new Estate ({
        createdAt: moment(timeStamp).format('YYYY-MM-DD'),
        ...req.body,
        owner: userIdToken,
        file: files
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

    let isUpdated, prevEstateFiles, prevEstateData, removePrevImg = false;

    if(files && files.length !== 0) {
        updates = {...updates, file: files};
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

    if(removePrevImg && prevEstateFiles && prevEstateFiles.length !== 0 && prevEstateFiles !== files) {
        try {

            prevEstateFiles.forEach( file => {
                if (file.path && fs.existsSync(file.path)) {
                    return fs.unlink(file.path, (err) => err && console.log('elo'))
                } else if (typeof file === 'string' && fs.existsSync(file)) {
                    return fs.unlink(file, (err) => err && console.log('helo'))
                } else return 
            });

            const rootFolder = 'uploads/images/estates';
            const fileLink = prevEstateFiles[0];
            const fileDir = fileLink.substring(0, fileLink.lastIndexOf('/'));

            if(!fileDir.includes(id) && fileDir.includes(rootFolder) && fileDir !== rootFolder && fs.existsSync(fileDir)) {
                fsPromise.rmdir(fileDir, { recursive: true})
            }
        } catch (err) { return new httpError('Something went wrong', 500) }
    }

    if(res.headersSent) next()

    res.json({ estate: isUpdated.toObject({ getters: true}) , message: 'Your post was updated successfully' });
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

    if(imagesToRemove && imagesToRemove.length !== 0) {
        try {

            imagesToRemove.forEach( file => {
                if (file.path && fs.existsSync(file.path)) {
                    return fs.unlink(file.path, (err) => err && console.log(err))
                } else if (typeof file === 'string' && fs.existsSync(file)) {
                    return fs.unlink(file, (err) => err && console.log(err))
                } else return 
            });

            const rootFolder = 'uploads/images/estates';
            const fileLink = imagesToRemove[0];
            const fileDir = fileLink.substring(0, fileLink.lastIndexOf('/'));

            if(fileDir !== rootFolder && fileDir.includes(rootFolder) && fs.existsSync(fileDir)) {
                fsPromise.rmdir(fileDir, { recursive: true })
            }

        } catch (err) { return new httpError('Something went wrong', 500) }
    }

    res.status(200).json({ message: 'Post deleted successfully'});
};


const likeEstateHandler = async(req, res, next) => {
    const userIdToken = req.authUser.userId;
    const { estateId } = req.body;
    let isLiked;

    try {
        isLiked = await EstateLikes.findOneAndUpdate({ estateId }, {$addToSet: { likes: userIdToken }}, { new: true});
    } catch (err) { return next(new httpError('Something went wrong', 500)) }

    if(!isLiked) return next(new httpError('No estate found', 404));

    return res.json({ estateLikes: isLiked, message: 'You liked that post'});
}


module.exports = {
    getEstatesHandler,
    getEstateByIdHandler,
    editEstateHandler,
    addNewEstateHandler,
    deleteEstateHandler,
    likeEstateHandler
}