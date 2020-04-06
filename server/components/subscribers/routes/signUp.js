const express = require('express');
const signUpHandler = require('../services/signUp');

const validate = require('../../shared/validators/validate');
const signUpValidationRules = require('../validators/signUpValidationRules');

const signUp = express.Router();
signUp.post('/', signUpValidationRules(), validate, signUpHandler);

module.exports = signUp;