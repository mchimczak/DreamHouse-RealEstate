const express = require('express');

const usersServices = require('../services/users');
const editUserValidatorRules = require('../validators/editUserValidatorRules');
const validate = require('../../shared/validators/validate');
const fileUpload = require('../../../middlewares/multer/fileUpload');

const users = express.Router();
users.get('/', usersServices.getUsersHandler);
users.get('/:id', usersServices.getUserByIdHandler);
users.post('/me/:id', fileUpload.array('file'), editUserValidatorRules(), validate, usersServices.updateUserDataHandler);

module.exports = users;