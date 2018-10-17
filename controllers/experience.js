const mongoose = require('mongoose');
const Experience = require('../data_models/experience');
const User = require('../data_models/user');

exports.createExperience = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const creator = req.user;

    Experience({
        title: title,
        description: description,
        creator: creator
    }).save()
        .then(experience => {
            return res.status(201).json({ success: true, data: {experience: experience}})
        })
        .then(null, err => {
            if (err.code === 11000) {
                errorMessage = ' is already registered in the system. Please login or use a different email.';
                return res.status(400).json( {success: false, data: errorMessage} )
            }
        }).catch(next);
};

exports.getUserExperiences = (req, res, next) => {
    Experience.find({creator: req.user}).exec()
        .then(userExperiences => {
            return res.status(200).json({success: true, data: userExperiences});
        })
        .catch(err => next(err));
};

exports.getAllExperiences = (req, res, next) => {

    Experience.find().exec()
        .then(experiences => {

            return res.status(200).send(experiences)
        })
        .then(null, err => {
            return next(err)
        });
};