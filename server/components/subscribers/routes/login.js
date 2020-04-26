const express = require('express');
const {loginHandler, loginTokenHandler} = require('../services/login');
const loginValidationRules = require('../validators/loginValidationRules');
const validate = require('../../shared/validators/validate');
const authValidator = require('../../../middlewares/jwt/auth');

const login = express.Router();
login.post('/', loginValidationRules(), validate, loginHandler);

login.use(authValidator);

login.post('/auth', loginValidationRules(), validate, loginTokenHandler);

module.exports = login;