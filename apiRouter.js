const express = require('express');
const passport = require('passport');

const passportStrategy = require('./config/passport');
const requireAuth = passport.authenticate('jwt', { session: false });

const configMain = require('./config/main');

const multer  = require('multer');
const uploadFile = multer({ dest: 'uploads/'}).single(configMain.uploadProfilePhotoFormKey);


module.exports = (app) => {

    // Setup passport
    passportStrategy(app);

    // Set up the routers
    const apiRoutes = express.Router();
    const authRoutes = express.Router();
    const userRoutes = express.Router();
    const experienceRoutes = express.Router();
    const imageRoutes = express.Router();
    const getImageRoutes = express.Router();

    // Connect the controllers
    const AuthController = require('./controllers/auth');
    const UserController = require('./controllers/user');
    const ExperienceController = require('./controllers/experience');
    const ImageController = require('./controllers/image');

    // Define the different routes

    // Auth Routes
    authRoutes.post('/login', AuthController.login);
    authRoutes.post('/register', uploadFile, AuthController.registerUser);


    // User Routes
    userRoutes.post('/', UserController.registerUser);
    userRoutes.get('/', UserController.getAllUsers);
    userRoutes.post('/friends', UserController.postNewFriend);
    userRoutes.get('/friends', UserController.getFriends);

    // Experiences Routes
    experienceRoutes.post('/', uploadFile, ExperienceController.createExperienceImage);
    experienceRoutes.get('/', ExperienceController.getUserExperiences);
    experienceRoutes.get('/all', ExperienceController.getAllExperiences);
    experienceRoutes.post('/join', ExperienceController.joinExperiences);
    experienceRoutes.delete('/', ExperienceController.deleteAllExperences);


    // image routes
    imageRoutes.post('/', uploadFile, ImageController.test);
    imageRoutes.post('/profile', uploadFile, ImageController.uploadImage);
    imageRoutes.post('/experience', uploadFile, ImageController.uploadImage);
    imageRoutes.get('/', ImageController.getProfilePhoto);
    imageRoutes.get('/all', ImageController.getAllProfilePhotos);

    // get image routes
    getImageRoutes.get('/imagePath/:imagePath', ImageController.sendImage);

    // Wire up the different Routes
    app.use('/auth', authRoutes);

    // Protected Routes
    app.use('/api', requireAuth, apiRoutes);
    app.use('/image', getImageRoutes);
    apiRoutes.use('/users', userRoutes);
    apiRoutes.use('/image', imageRoutes);
    apiRoutes.use('/experience', experienceRoutes);
};