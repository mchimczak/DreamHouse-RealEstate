const httpError = require('../../../models/http-error');
const { addNewUserHandler } = require('../../users/services/users');

module.exports = signUpHandler = async (req, res, next) => {
    const user = req.body;
    const isUserAdded = addNewUserHandler(user);

    isUserAdded
        ? res.status(201).send({ message: `Thank you for joining in ${user.name}` })
        : next(new httpError('This email is already taken, please try another', 404))
};