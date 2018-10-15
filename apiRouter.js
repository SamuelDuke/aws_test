const express = require('express');

module.exports = (app) => {
    const apiRoutes = express.Router();
    const userRoutes = express.Router();

    const ApiController = require('./controllers/api');
    const UserController = require('./controllers/user');

    userRoutes.post('/', UserController.registerUser);
    userRoutes.get('/', UserController.getAllUsers);

    apiRoutes.use('/users', userRoutes);

    app.use('/api', apiRoutes);
};