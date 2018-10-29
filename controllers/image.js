const fs = require('fs');
const path = require('path');

const User = require('../data_models/user');
const configMain = require('../config/main');

const rootPath = 'http://54.69.223.221:8080';

const uploadPhoto = require('../config/uploadPhoto');

exports.test = (req, res, next) => {
    const fileName = `${req.user._id}-${Date.now()}.jpg`;
    const filePath = req.file.path;

    async getPhoto => {
        try {
            console.log('Started');
            const photoUri = await uploadPhoto.upload(fileName, filePath);

            console.log('photoUri', photoUri);

            // add new profilePhoto object to the array
            req.user.allProfilePhotos.push(photoUri);
            // Set photo as the active profile photo
            req.user.activeProfilePhoto = photoUri;

            req.user.save()
                .then(data => {
                    return data;
                })
                .catch(err => {
                    console.log(err);
                    err
                })
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
    };
    // // add new profilePhoto object to the array
    // req.user.allProfilePhotos.push(photoUri);
    // // Set photo as the active profile photo
    // req.user.activeProfilePhoto = photoUri;
    //
    // req.user.save()
    //     .then(data => {
    //         return res.send(data)
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         return res.send(err)
    //     })
};

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
        `${rootPath}/image/imagePath/${fileName}`
    );

    // Set photo as the active profile photo
    req.user.activeProfilePhoto = `${rootPath}/image/imagePath/${fileName}`;

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
