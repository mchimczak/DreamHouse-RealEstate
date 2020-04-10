const express = require('express');

const validate = require('../../shared/validators/validate');
const signUpValidationRules = require('../validators/signUpValidationRules');
const { addNewUserHandler } = require('../../users/services/users');

const signUp = express.Router();
signUp.post('/', signUpValidationRules(), validate, addNewUserHandler);

module.exports = signUp;