const mongoose = require('mongoose')

// Create task schema 
const listModel = mongoose.Schema({
    name: String,
    description: String,
    userId: String,
    creation: Date,
    removed: Boolean
});

module.exports = mongoose.model('lists', listModel);