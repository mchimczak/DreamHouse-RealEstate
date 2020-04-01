const { body } = require('express-validator');

module.exports = loginValidationRules = () => {
    return [
        body('email').trim().isEmail(),
        body('password').trim().isString().isLength({ min: 6 })
    ]
};