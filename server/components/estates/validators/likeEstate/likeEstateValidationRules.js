'use strict'
const { body } = require('express-validator');

const likeEstateValidationRules = () => {
    return [
        body('estateId').exists()
    ]
};

module.exports = likeEstateValidationRules