'use strict'
const { body, check } = require('express-validator');

const  signUpValidationRules = () => {
    return [
        body('email').normalizeEmail().isEmail(),
        body('password').isString().isLength({ min: 6 }),
        body('name').isLength({ min: 2 }).isString(),
        body('phone').optional({checkFalsy: true}).isLength({ min: 9, max: 9 }),
        check('files').isArray().optional({checkFalsy: true})
    ]
};

module.exports = signUpValidationRules;