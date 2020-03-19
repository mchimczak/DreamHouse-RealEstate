const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const estatesRoutes = require('./routes/estates');
const usersRoutes = require('./routes/users');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "localhost:5000"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
app.use(estatesRoutes);
app.use('/users' , usersRoutes);

app.listen(PORT);