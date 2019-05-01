const mongoose = require('mongoose')

// Create user schema 
const userModel = mongoose.Schema({
    name: String,
    password: String,
    email: String,
    creation: Date,
    removed: Boolean
});

module.exports = mongoose.model('users', userModel);