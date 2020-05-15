'use strict'
const { validationResult } = require('express-validator');
const httpError = require('../http-errors/http-errors');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        return next()
    }
    
    next(new httpError(`Please provide valid data`, 422));
};

module.exports = validate;