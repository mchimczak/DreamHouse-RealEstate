const { body } = require('express-validator');

module.exports = likeEstateValidationRules = () => {
    return [
        body('estateId').exists(),
        body('userId').exists(),
    ]
};