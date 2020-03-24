const express = require('express');
const login = express.Router();

const httpError = require('../../models/http-error');
const USERS_LIST = require('../../DUMMY_DATA/UsersList');

login.post('/', async (req, res, next) => {
    const { email, password } = req.body;
    const user = USERS_LIST.find( user => user.email === email && user.password === password);

    if(!user) return next(new httpError('Cannot log in, please check your email and password', 404));

    res.send({ user });
})

module.exports = login;