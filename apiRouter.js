const express = require('express');

module.exports = (app) => {
    const apiRoutes = express.Router();
    const userRoutes = express.Router();
    const experienceRoutes = express.Router();

    const ApiController = require('./controllers/api');
    const UserController = require('./controllers/user');
    const ExperienceController = require('./controllers/experience');

    userRoutes.post('/', UserController.registerUser);
    userRoutes.get('/', UserController.getAllUsers);

    experienceRoutes.post('/', ExperienceController.createExperience);
    experienceRoutes.get('/', ExperienceController.getAllExperiences);

    apiRoutes.use('/users', userRoutes);
    apiRoutes.use('/experience', experienceRoutes);

    app.use('/api', apiRoutes);
};