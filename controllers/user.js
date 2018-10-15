const mongoose = require('mongoose');
const User = require('../data_models/user');

exports.registerUser = (req, res, next) => {
    console.log('req.body', req.body);
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    //const verifyPassword = req.body.verifyPassword;

    let errorMessage = '';
    // if (validateEmail(email)) { errorMessage = email + ' is not a valid email.'; }
    if (firstName === '') { errorMessage = 'There was no first name.' }
    if (lastName === '') { errorMessage = 'There was no last name.' }
    //if (password !== verifyPassword) { errorMessage = 'The password did not match the verified password.' }

    if (errorMessage !== '') {
        return res.status(400).json({ userMessage: errorMessage })
    }
    console.log(firstName, lastName);

    User({
        firstName: firstName,
        lastName: lastName,
        password: password,
        email: email
    }).save()
        .then(user => {
            return res.status(201).json({ registered: true })
        })
        .then(null, err => {
            if (err.code === 11000) {
                errorMessage = email + ' is already registered in the system. Please login or use a different email.';
                return res.status(400).json( {userMessage: errorMessage} )
            }
        }).catch(next);
};

exports.getAllUsers = (req, res, next) => {

    User.find().exec()
        .then(users => {
            const updatedUsers = users.map((user) => {
                return user.infoToSend();
            });
            return res.status(200).send(updatedUsers)
        })
        .then(null, err => {
            return next(err)
        });
};