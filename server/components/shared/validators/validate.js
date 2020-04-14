const { validationResult } = require('express-validator');
const httpError = require('../http-errors/http-errors');

module.exports = validate = (req, res, next) => {
    // console.log(req.body);
    // console.log(req.files);
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        return next()
    }
    
    next(new httpError(`Please provide valid data`, 422));
};