const httpError = require('../models/http-error');
const {logInUser} = require('../DUMMY_DATA/UsersList');

module.exports = loginHandler = async (req, res, next) => {
        const { email, password } = req.body;
        const user = logInUser(email, password);

        user
        ? res.send({ user, message: `Welcome back ${user.name}.` })
        : next(new httpError('Cannot log in, please check your email and password.', 404))
        
}