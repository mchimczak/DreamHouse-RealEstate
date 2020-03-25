const httpError = require('../models/http-error');
const USERS_LIST = require('../DUMMY_DATA/UsersList');

module.exports = signUpHandler = async (req, res, next) => {
    const user = req.body;

    const isUser = USERS_LIST.find( el => el.email === user.email );
    if(isUser) return next(new httpError('This email is already taken, please try another', 404));

    USERS_LIST.push({...user});
    console.log(USERS_LIST)
    res.status(201).send({ 
         ok: 'ok'
    })
};