const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
//ROUTES
const estatesRoutes = require('./components/estates/routes/estates');
const usersRoutes = require('./components/users/routes/users')
const loginRoute = require('./components/subscribers/routes/login');
const signUpRoute = require('./components/subscribers/routes/signUp');
//SERVICES
const findMostLikedEstates = require('./components/homePage/services/homePage');
//HTTPERROR
const HttpError = require('./models/http-error');
//POST REQUEST TRIMMER
const postReqTrimmer = require('./components/shared/postReqTrimmer/postReqTrimmer');

const app = express();
const PORT = 5000;

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(postReqTrimmer);
app.use(cors());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.get('/', findMostLikedEstates);
app.use('/estates',estatesRoutes);
app.use('/users' , usersRoutes);
app.use('/login', loginRoute);
app.use('/signup', signUpRoute);


app.use((req,res, next) => {
    const error = new HttpError('Could not found this page', 404);
    throw error;
});

app.use((error, req, res, next) => {
    const handleCancelUploadImg = file => fs.unlink(file.path, err => console.log(err));
    if(req.files) {
        let files = req.files;
        files.forEach(file => handleCancelUploadImg(file))
    };

    if(res.headerSent) return next(error);

    res.status(error.code || 500);
    res.json({message: error.message || 'An error occurred!'});
});


mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => app.listen(PORT))
    .catch(err => console.log(err));
