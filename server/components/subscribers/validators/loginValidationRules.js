const { body } = require('express-validator');

module.exports = loginValidationRules = () => {
    return [
        body('email').normalizeEmail().isEmail(),
        body('password').isString().isLength({ min: 6 })
    ]
};