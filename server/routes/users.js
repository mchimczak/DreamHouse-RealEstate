const express = require('express');

const usersServices = require('../services/users');

const users = express.Router();
users.get('/', usersServices.getUsersHandler);
users.get('/:id', usersServices.getUserByIdHandler);
users.patch('/me/:id', usersServices.updateUserDataHandler);

module.exports = users;