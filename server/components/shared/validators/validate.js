const { validationResult } = require('express-validator');
const multer = require('multer');
const httpError = require('../http-errors/http-errors');

module.exports = validate = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        return next()
    }
    
    next(new httpError(`Please provide valid data`, 422));
};