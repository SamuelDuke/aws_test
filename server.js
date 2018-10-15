// npm install --save express body-parser mongoose passport bcrypt-nodejs jsonwebtoken passport-jwt cors

const express = require('express');

const apiRouter = require('./apiRouter');
const configMain = require('./config/main');

const app = express();

// Setup router
apiRouter(app);

// Start the server
let server = app.listen(configMain.port);
console.log('The server is listening at port ' + configMain.port + ".");