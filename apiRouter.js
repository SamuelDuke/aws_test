const express = require('express');
const passport = require('passport');

const passportStrategy = require('./config/passport');
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {

    // Setup passport
    passportStrategy(app);

    // Set up the routers
    const apiRoutes = express.Router();
    const authRoutes = express.Router();
    const userRoutes = express.Router();
    const experienceRoutes = express.Router();

    // Connect the controllers
    const AuthController = require('./controllers/auth');
    const UserController = require('./controllers/user');
    const ExperienceController = require('./controllers/experience');

    // Define the different routes

    // Auth Routes
    authRoutes.post('/login', AuthController.login);
    authRoutes.post('/register', AuthController.registerUser);


    // User Routes
    userRoutes.post('/', UserController.registerUser);
    userRoutes.get('/', UserController.getAllUsers);
    userRoutes.post('/friends', UserController.postNewFriend);
    userRoutes.get('/friends', UserController.getFriends);

    // Experiences Routes
    experienceRoutes.post('/', ExperienceController.createExperience);
    experienceRoutes.get('/', ExperienceController.getUserExperiences);


    // Wire up the different Routes
    app.use('/auth', authRoutes);

    // Protected Routes
    app.use('/api', requireAuth, apiRoutes);
    apiRoutes.use('/users', userRoutes);
    apiRoutes.use('/experience', experienceRoutes);
};