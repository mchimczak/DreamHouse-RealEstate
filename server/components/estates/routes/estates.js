'use strict'
const express = require('express');

const estatesServices = require('../services/estates');
const validate = require('../../shared/validators/validate');
const addEstateValidationRules = require('../validators/addEstate/addEstateValidationRules');
const editEstateValidationRules = require('../validators/editEstate/editEstateValidationRules');
const likeEstateValidationRules = require('../validators/likeEstate/likeEstateValidationRules');
const imageUpload = require('../middlewares/multer/imageUploadHandler');
const authValidator = require('../../../middlewares/jwt/auth');

const estates = express.Router();
estates.get('/', estatesServices.getEstatesHandler);
estates.get('/:estateId', estatesServices.getEstateByIdHandler);

estates.use(authValidator);

estates.post('/new', 
    imageUpload.imgUpload,
    imageUpload.resizeFile, 
    addEstateValidationRules(), 
    validate, 
    estatesServices.addNewEstateHandler
);

estates.post('/:estateId', 
    imageUpload.imgUpload,
    imageUpload.resizeFile, 
    editEstateValidationRules(), 
    validate, 
    estatesServices.editEstateHandler
);
estates.delete('/:estateId', estatesServices.deleteEstateHandler);
estates.post('/:estateId/like', likeEstateValidationRules(), validate, estatesServices.likeEstateHandler);

module.exports = estates;