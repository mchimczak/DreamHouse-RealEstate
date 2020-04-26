const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const httpError = require('../../../models/http-error');
const User = require('../../users/models/user');

const loginHandler = async (req, res, next) => {
    const { email, password } = req.body;
    let user, token, isMatch;
    try {
        user = await User.findOne({ email });
    } catch(err) { return next(new httpError('Login failed, try again later', 404)) };

    if(!user) return next(new httpError('Cannot log in, please check your email and password.', 403));

    try {
        isMatch = await bcrypt.compare(password, user.password);
    } catch(err) { return next(new httpError('Login failed, try again later', 500)) }
    
    if(!isMatch) return next(new httpError('Login failed, try again later', 403));

    try {
        token = jwt.sign({
            userId: user._id,
            email: user.email
        }, process.env.JWT_SECRET_KEY , { expiresIn: '30min'} );

    } catch (err) { return new httpError('Something went wrong, please try again later', 500) }

    res.json({ user: user.toObject({ getters: true}), token: token, message: `Welcome back ${user.name}.` });      
};

const loginTokenHandler = async (req, res, next) => {
    let user;

    try {
        user = await User.findById(req.authUser.userId);
    } catch(err) { return next(new httpError('Something went wrong', 500)) };

    if(!user) return next(new httpError('Your session has timed out, pleae log in again', 403));

    try {
        token = jwt.sign({
            userId: user._id,
            email: user.email
        }, process.env.JWT_SECRET_KEY , { expiresIn: '30min'} );

    } catch (err) { return new httpError('Something went wrong, please try again later', 500) }

    res.json({ user: user.toObject({ getters: true}), token: token });
}

module.exports = {
    loginHandler,
    loginTokenHandler
}