const express = require('express');

module.exports = (app) => {
    const apiRoutes = express.Router();

    const ApiController = require('./controllers/api');
    apiRoutes.get('/', ApiController.sendInfo);

    app.use('/', apiRoutes);
};