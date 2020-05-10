const { body, check } = require('express-validator');

module.exports = editUserValidationRules = () => {
    return [
        body('id').exists(),
        body('password').trim().isString().isLength({ min: 6 }).optional({ checkFalsy: true}),
        body('name').trim().isLength({ min: 2 }).isString(),
        body('phone').optional({checkFalsy: true}).trim().isLength({ min: 9, max: 9}),
        check('files').isArray().optional({checkFalsy: true})
    ]
};