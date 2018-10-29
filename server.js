// npm install --save express body-parser mongoose passport bcrypt-nodejs
// https://cloud.mongodb.com/v2/5bc50287553855119451d8c5#clusters

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const apiRouter = require('./apiRouter');
const configMain = require('./config/main');

const app = express();

// Connect mongoose to handle promises
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

// Database Setup
mongoose.connection.openUri(configMain.database, {useNewUrlParser: true, useFindAndModify: false}).catch(err => {console.log(err)});



// Setup middleware for all Express requests
app.use(bodyParser.json({ extended: true}));
app.use(bodyParser.urlencoded({ extended: true}));
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());


// Setup router
apiRouter(app);

// Start the server
let server = app.listen(configMain.port);
console.log('The server is listening at port ' + configMain.port + ".");