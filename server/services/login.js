const httpError = require('../models/http-error');
const {getUsersList} = require('../DUMMY_DATA/UsersList');

module.exports = loginHandler = async (req, res, next) => {
        const { email, password } = req.body;
        const user = getUsersList().find( user => user.email === email && user.password === password);
    
        if(!user) return next(new httpError('Cannot log in, please check your email and password', 404));
    
        res.send({ user });
}