const express = require('express');
const loginHandler = require('../../services/login');

const login = express.Router();
login.post('/', loginHandler);

module.exports = login;