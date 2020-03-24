const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const estatesRoutes = require('./routes/estates');
const usersRoutes = require('./routes/users');
const loginRoute = require('./routes/auth/login');
const signUpRoute = require('./routes/auth/signUp');

const ESTATES_DATA = require('./DUMMY_DATA/EstatesData');
const USER_LIKES = require('./DUMMY_DATA/UserLikes');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res, next) => {
    const bestThreeEstate = [];
    const mostLikedEstates = USER_LIKES.sort( (a, b) => {
        return b.likes.length - a.likes.length
    }).slice(0, 3);
    ESTATES_DATA.map( estate => {
        return mostLikedEstates.forEach( (obj, index) => {
            if(estate.id === obj.estateId) {
                return bestThreeEstate.splice(index, 0, estate)
            }
        })
    });

    if(!bestThreeEstate) return next(new httpError('Sth went wrong', 404));

    res.json({ 
        bestThreeEstate,
        mostLikedEstates 
    });
});

app.use('/estates',estatesRoutes);
app.use('/users' , usersRoutes);
app.use('/login', loginRoute);
app.use('/signup', signUpRoute);

app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }

    res.status(error.code || 500);
    res.json({message: error.message || 'An error occurred!'});
})

app.listen(PORT);