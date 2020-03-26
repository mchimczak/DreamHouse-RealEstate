const USERS_LIST = [
    { 
        id: 'u1', 
        name: 'Jackie', 
        email: 'jackie@img.com', 
        password: 'aaabbbc', 
        phone: '333444555', 
        estates: '5'
    },{
        id: 'u2', 
        name: 'Andy', 
        email: 'andyimg@email.com', 
        password: 'aaabbbc', 
        phone: '333444555', 
        estates: '7'
    }
];

const addNewUser = (user) => {
    return USERS_LIST.push(user);
};

// module.exports = USERS_LIST;
exports.USERS_LIST = USERS_LIST;
exports.addNewUser = addNewUser;