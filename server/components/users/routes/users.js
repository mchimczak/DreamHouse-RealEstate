const express = require('express');

const usersServices = require('../services/users');
const editUserValidatorRules = require('../validators/editUserValidatorRules');
const validate = require('../../shared/validators/validate');
const fileUploadHanlder = require('../middlewares/fileUpload/ImageUploadHandler');
const authValidator = require('../../../middlewares/jwt/auth');

const users = express.Router();
users.get('/', usersServices.getUsersHandler);
users.get('/:id', usersServices.getUserByIdHandler);

users.use(authValidator);

users.post('/me/:id', 
    fileUploadHanlder.imgUpload, 
    fileUploadHanlder.resizeFile, 
    editUserValidatorRules(), 
    validate, 
    usersServices.updateUserDataHandler
);

module.exports = users;