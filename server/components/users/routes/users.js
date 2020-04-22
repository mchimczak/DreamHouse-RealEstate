const express = require('express');

const usersServices = require('../services/users');
const editUserValidatorRules = require('../validators/editUserValidatorRules');
const validate = require('../../shared/validators/validate');
const fileUploadHanlder = require('../middlewares/multer/userImageUploadHandler');

const users = express.Router();
users.get('/', usersServices.getUsersHandler);
users.get('/:id', usersServices.getUserByIdHandler);
users.post('/me/:id', fileUploadHanlder, editUserValidatorRules(), validate, usersServices.updateUserDataHandler);

module.exports = users;