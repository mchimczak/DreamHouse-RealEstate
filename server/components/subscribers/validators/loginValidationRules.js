const { body, oneOf, check } = require('express-validator');

module.exports = loginValidationRules = () => {
    return oneOf([
        [
            body('email').normalizeEmail().isEmail(),
            body('password').isString().isLength({ min: 6 })
        ],
        check('authorization').exists()
    ]);
};