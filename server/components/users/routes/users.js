const express = require('express');

const usersServices = require('../services/users');
const editUserValidatorRules = require('../validators/editUserValidatorRules');
const validate = require('../../shared/validators/validate');

const users = express.Router();
users.get('/', usersServices.getUsersHandler);
users.get('/:id', usersServices.getUserByIdHandler);
users.patch('/me/:id', editUserValidatorRules(), validate, usersServices.updateUserDataHandler);

module.exports = users;