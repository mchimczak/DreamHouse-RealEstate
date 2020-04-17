const express = require('express');

const estatesServices = require('../services/estates');
const validate = require('../../shared/validators/validate');
const addEstateValidationRules = require('../validators/addEstate/addEstateValidationRules');
const editEstateValidationRules = require('../validators/editEstate/editEstateValidationRules');
const likeEstateValidationRules = require('../validators/likeEstate/likeEstateValidationRules');
const fileUploadHandler = require('../middlewares/multer/estateImageUploadHandler');

const estates = express.Router();
estates.get('/', estatesServices.getEstatesHandler);
estates.get('/:estateId', estatesServices.getEstateByIdHandler);
estates.post('/:estateId', fileUploadHandler, editEstateValidationRules(), validate, estatesServices.editEstateHandler);
estates.delete('/:estateId', estatesServices.deleteEstateHandler);
estates.post('/:estateId/like', likeEstateValidationRules(), validate, estatesServices.likeEstateHandler);
estates.post('/new', fileUploadHandler, addEstateValidationRules(), validate, estatesServices.addNewEstateHandler);

module.exports = estates;