const jwt = require('jsonwebtoken');
const httpError = require('../../components/shared/http-errors/http-errors');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token) return new httpError('Authentication failed', 401)

        const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.authUser = { userId };
        
        next()
    } catch (err) { return new httpError('Authentication failed', 401) }
};