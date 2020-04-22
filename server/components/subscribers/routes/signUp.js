const express = require('express');

const validate = require('../../shared/validators/validate');
const signUpValidationRules = require('../validators/signUpValidationRules');
const { addNewUserHandler } = require('../../users/services/users');
const fileUploadHanlder = require('../../users/middlewares/multer/userImageUploadHandler');

const signUp = express.Router();
signUp.post('/', fileUploadHanlder, signUpValidationRules(), validate, addNewUserHandler);

module.exports = signUp;