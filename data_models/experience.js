const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const User = require('./user');

const ExperienceSchema = new Schema({
    creator: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    members: [{ type : Schema.Types.ObjectId, ref: 'User' }],
    title: {type: String, required: true},
    description: {type: String},
    coverPhoto: {type: String},
    allPhotos: {type: String}
});

// // info to send
// ExperienceSchema.methods.infoToSend = function() {
//     return {
//         firstName: this.firstName,
//         lastName: this.lastName,
//         id: this._id
//     }
// };

module.exports = mongoose.model('Experience', ExperienceSchema);