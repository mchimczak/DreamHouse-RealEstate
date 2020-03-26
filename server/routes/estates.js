const express = require('express');

const estatesServices = require('../services/estates');

const estates = express.Router();
estates.get('/', estatesServices.getEstatesHandler);
estates.get('/:estateId', estatesServices.getEstateByIdHandler);
estates.patch('/:estateId', estatesServices.editEstateHandler);
estates.delete('/:estateId', estatesServices.deleteEstateHandler);
estates.post('/new', estatesServices.addNewEstateHandler);

module.exports = estates;