const express = require('express');
const signUpHandler = require('../../services/signUp');

const signUp = express.Router();
signUp.post('/', signUpHandler);

module.exports = signUp;