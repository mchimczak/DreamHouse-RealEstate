const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//ROUTES
const estatesRoutes = require('./routes/estates');
const usersRoutes = require('./routes/users');
const loginRoute = require('./routes/auth/login');
const signUpRoute = require('./routes/auth/signUp');
//SERVICES
const findMostLikedEstates = require('./services/homePage');

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