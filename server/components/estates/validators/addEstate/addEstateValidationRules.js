const { body, check } = require('express-validator');

module.exports = addEstaterValidationRules = () => {
    return [
        body('owner').exists(),
        body('email').isEmail(),
        body('title').isLength({min: 5, max: 25}),
        body('city').isLength({min: 3, max: 25}),
        body('address').isLength({min: 5, max: 25}),
        body('price').matches(/(^[1-9])\d{3,6}$/),
        body('description').optional({checkFalsy: true}).isLength({min: 10, max: 500}),
        body('area').optional({checkFalsy: true}).matches(/^[1-9]\d{0,4}$/),
        body('rooms').optional({checkFalsy: true}).matches(/^[1-9]$/),
        body('year').optional({checkFalsy: true}).matches(/^(19[4-9]\d|20[0-1]\d|2020)$/),
        check('files.file').isArray().optional({checkFalsy: true})
    ]
};