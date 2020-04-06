const httpError = require('../../../models/http-error');
const {logInUser} = require('../../users/DUMMY_DATA/UsersList');

const User = require('../../users/models/user');

module.exports = loginHandler = async (req, res, next) => {
        const { email, password } = req.body;
        // const user = logInUser(email, password);
        const user = await User.findOne({ email, password}, (err, obj) => {
                if (err) next(new httpError('No user.', 404))
                return obj
        })

        user
        ? res.json({ user: user.toObject({ getters: true}), message: `Welcome back ${user.name}.` })
        : next(new httpError('Cannot log in, please check your email and password.', 404))
        
}