const express = require('express');

const usersServices = require('../services/users');

const users = express.Router();
users.get('/', usersServices.getUsers);
users.get('/:id', usersServices.getUserById);
users.patch('/me/:id', usersServices.updateUserById);

module.exports = users;