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

const getUsersList = () => {
    return USERS_LIST;
};

const getUserById = (userId) => {
    return getUsersList().find( user => user.id === userId);
};

const addNewUser = (user) => {
    return USERS_LIST.push(user);
};

const updateUserData = (updatedUser) => {
    return getUsersList().find((user, index) => {
        if(user.id === updatedUser.id) {
            return USERS_LIST.splice(index, 1, updatedUser);
        }
    });
};

const logInUser = (email, password) => {
    return getUsersList().find( user => user.email === email && user.password === password );
}

// exports.USERS_LIST = USERS_LIST;
// exports.addNewUser = addNewUser;

module.exports = {
    getUsersList,
    getUserById,
    addNewUser,
    updateUserData,
    logInUser
};