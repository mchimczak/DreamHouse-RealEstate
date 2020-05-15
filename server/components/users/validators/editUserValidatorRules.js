'use strict'
const { body, check } = require('express-validator');

const editUserValidationRules = () => {
    return [
        body('id').exists(),
        body('password').trim().isString().isLength({ min: 6 }).optional({ checkFalsy: true}),
        body('name').trim().isLength({ min: 2 }).isString(),
        body('phone').optional({checkFalsy: true}).trim().isLength({ min: 9, max: 9}),
        check('files').isArray().optional({checkFalsy: true})
    ]
};

module.exports = editUserValidationRules;