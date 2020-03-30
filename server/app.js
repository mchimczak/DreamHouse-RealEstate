const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//ROUTES
const estatesRoutes = require('./components/estates/routes/estates');
const usersRoutes = require('./components/users/routes/users')
const loginRoute = require('./components/subscribers/routes/login');
const signUpRoute = require('./components/subscribers/routes/signUp');
//SERVICES
const findMostLikedEstates = require('./components/homePage/services/homePage');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', findMostLikedEstates);
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