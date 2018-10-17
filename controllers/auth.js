const jwt = require('jsonwebtoken');
const configMain = require('../config/main');

const User = require('../data_models/user');

const generateToken = (user) => {
    return jwt.sign(user, configMain.jwtSecret, {
        expiresIn: configMain.jwtExpiration // in seconds
    });
};

// const validateEmail = (email) => {
//     const re = /\S+@\S+\.\S+/;
//     // console.log('re.test(email);', re.test(email));
//     return re.test(email);
// };

exports.registerUser = (req, res, next) => {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const verifyPassword = req.body.verifyPassword;

    let errorMessage = '';

    if (firstName === '') { errorMessage = 'There was no first name.' }
    if (lastName === '') { errorMessage = 'There was no last name.' }
    if (password !== verifyPassword) { errorMessage = 'The password did not match the verified password.' }

    if (errorMessage !== '') {
        return res.status(400).json({ success: false, data: errorMessage })
    }

    User({
        firstName: firstName,
        lastName: lastName,
        password: password,
        email: email
    }).save()
        .then(user => {
            const userToSend = user.infoToSend();
            const token = 'Bearer ' + generateToken(userToSend);
            return res.status(201).json({ success: true, data: { user: userToSend, token: token }});
        })
        .then(null, err => {
            if (err.code === 11000) {
                errorMessage = email + ' is already registered in the system. Please login or use a different email.';
                return res.status(400).json({ success: false, data: errorMessage })
            }
        }).catch(next);
};

exports.login = (req, res, next) => {

    User.findOne({email: req.body.email}).exec()
        .then(user => {
            if (user === null) {
                res.status(422).json({success: false, data: 'That is not a valued email.'});
            }
            if (user.validPassword(req.body.password)) {
                const userToSend = user.infoToSend();
                const token = 'Bearer ' + generateToken(userToSend);
                res.status(200).json({success: true, data: {user: userToSend, token: token}});
            } else {
                res.status(401).json({success: false, data: 'The password was not entered correctly'});
            }
        }).then(null, err => { return next(err); })
};