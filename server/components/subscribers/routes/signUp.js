'use strict'
const express = require('express');
const validate = require('../../shared/validators/validate');
const signUpValidationRules = require('../validators/signUpValidationRules');
const { addNewUserHandler } = require('../../users/services/users');
const fileUploadHanlder = require('../../users/middlewares/fileUpload/ImageUploadHandler');

const signUp = express.Router();

signUp.post('/',
    fileUploadHanlder.imgUpload, 
    fileUploadHanlder.resizeFile, 
    signUpValidationRules(), 
    validate, 
    addNewUserHandler
);

module.exports = signUp;