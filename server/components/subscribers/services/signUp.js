const httpError = require('../../../models/http-error');
const { addNewUserHandler } = require('../../users/services/users');

module.exports = signUpHandler = (req, res, next) => {
    const user = req.body;
    const isUserAdded = addNewUserHandler(user);
    console.log(isUserAdded);

    isUserAdded
        ? res.status(201).json({ user: isUserAdded , message: `Thank you for joining in ${user.name}` })
        : next(new httpError('This email is already taken, please try another', 404))
};