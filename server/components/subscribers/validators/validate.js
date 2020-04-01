const { validationResult } = require('express-validator');
const httpError = require('../../../models/http-error');

module.exports = validate = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        return next()
    }
    
    next(new httpError(`Please provide valid data`, 422));
};