const { body } = require('express-validator');

module.exports = signUpValidationRules = () => {
    return [
        body('email').trim().isEmail(),
        body('password').trim().isString().isLength({ min: 6 }),
        body('name').trim().isLength({ min: 2 }).isString(),
        body('phone').optional().trim().isLength({ min: 9, max: 9})
    ]
};