const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    firstName: {type: String, required: [true, 'You must submit a first name.']},
    lastName: {type: String, required: [true, 'You must submit a last name.']},
    email: {type: String, required: [true, 'You must submit an email.'], unique: true},
    password: {type: String, required: [true, 'You must submit a last name.']},
    friends: [{ type : Schema.Types.ObjectId, ref: 'User' }]
});

// info to send
UserSchema.methods.infoToSend = function() {
    return {
        firstName: this.firstName,
        lastName: this.lastName,
        id: this._id
    }
};

// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.pre('save', function(next) {
    let user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    user.password = user.generateHash(user.password);
    next();
});

// UserSchema.statics.getUserByName = function(name) {
//     this.find({firstName: name}, (err, user) => {console.log('Ther user with name', name, 'is', user); return user});
// };

module.exports = mongoose.model('User', UserSchema);