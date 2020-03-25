const express = require('express');

const estatesServices = require('../services/estates');

const estates = express.Router();
estates.get('/', estatesServices.getEstates);
estates.get('/:estateId', estatesServices.getEstateById);

module.exports = estates;