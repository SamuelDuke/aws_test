const fs = require('fs');
const path = require('path');

const User = require('../data_models/user');
const configMain = require('../config/main');

const rootPath = 'http://54.69.223.221:8080';

exports.uploadImage = (req, res, next) => {

    // ToDo reduce the image resolution, and size
    //const tmp_path = req.file.path;
    const fileName = `${req.user._id}-${Date.now()}.jpg`;
    const target_path = `uploads/${fileName}`;

    // renaming real file
    fs.rename(req.file.path, target_path, function (err) {
        if (err) {
            configMain.response(res, 500, 'error','There was an error trying to save the image to the server', null, err);
        }
    });

    // add new profilePhoto object to the array
    req.user.allProfilePhotos.push(
        `${rootPath}/api/image/imagePath/${fileName}`
    );

    // Set photo as the active profile photo
    req.user.activeProfilePhoto = `${rootPath}/api/image/imagePath/${fileName}`;

    // Save and respond with updated user
    req.user.save((err) => {
        if (err) {
            configMain.response(res, 500, 'error','There was an error trying update user', null, err);
        }
        configMain.response(res, 200, 'success','Updated User', req.user, null);
    });
};

exports.getProfilePhoto = (req,res,next) => {
    configMain.response(res, 200, 'success', 'Active profile photo.', req.user.activeProfilePhoto, null);
};

exports.getAllProfilePhotos = (req,res,next) => {
    configMain.response(res, 200, 'success', 'All profile photos.', req.user.allProfilePhotos, null);
};

exports.sendImage = (req, res, next) => {
    const imagePath = req.params.imagePath;
    fs.stat(imagePath, (err, stats) => {
        console.log('stats');
        console.log(stats);
    });
    res.sendFile(path.join(__dirname, '../uploads/' + imagePath))
};