const express = require('express');

const validate = require('../../shared/validators/validate');
const signUpValidationRules = require('../validators/signUpValidationRules');
const { addNewUserHandler } = require('../../users/services/users');
const filUpload = require('../../../middlewares/fileUpload');

const signUp = express.Router();
signUp.post('/', filUpload.array('file'), signUpValidationRules(), validate, addNewUserHandler);

module.exports = signUp;