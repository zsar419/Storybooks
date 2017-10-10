const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema creation
const UserSchema = new Schema({
    googleID: {
        type: String,
        required: true      // Change this to false if using other auth mechanisms (locla, fb etc.)
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    }
});

// Create collection and add schema
mongoose.model('users', UserSchema);
// module.exports = mongoose.model('users', UserSchema);