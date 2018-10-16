const mongoose = require('mongoose');
const Experience = require('../data_models/experience');
const User = require('../data_models/user');

exports.createExperience = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const creator = User.getUserByName(req.body.creator);

    console.log('createExperience was called ', title, description, creator);

    Experience({
        title: title,
        description: description,
        creator: creator
    }).save()
        .then(experience => {
            return res.status(201).json({ created: true })
        })
        .then(null, err => {
            if (err.code === 11000) {
                errorMessage = ' is already registered in the system. Please login or use a different email.';
                return res.status(400).json( {userMessage: errorMessage} )
            }
        }).catch(next);
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