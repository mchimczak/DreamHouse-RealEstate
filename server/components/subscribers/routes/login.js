const express = require('express');
const loginHandler = require('../services/login');
const loginValidationRules = require('../validators/loginValidationRules');
const validate = require('../../shared/validators/validate');

const login = express.Router();
login.post('/', loginValidationRules(), validate, loginHandler);

module.exports = login;