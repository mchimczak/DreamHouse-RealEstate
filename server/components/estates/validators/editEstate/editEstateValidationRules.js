const { check } = require('express-validator');

module.exports = editEstaterValidationRules = () => {
    return [
        check('id').exists(),
        check('updates.title').isLength({min: 5}),
        check('updates.city').isLength({min: 3}),
        check('updates.address').isLength({min: 5}),
        check('updates.price').matches(/(^[1-9])\d{3,6}$/),
        check('updates.description').optional({checkFalsy: true}).isLength({min: 10, max: 1000}),
        check('updates.area').optional({checkFalsy: true}).matches(/^[1-9]\d{0,4}$/),
        check('updates.rooms').optional({checkFalsy: true}).matches(/^[1-9]$/),
        check('updates.year').optional({checkFalsy: true}).matches(/^(19[4-9]\d|20[0-1]\d|2020)$/)
    ]
};