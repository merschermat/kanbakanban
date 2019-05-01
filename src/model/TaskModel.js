const mongoose = require('mongoose')

// Create task schema 
const taskModel = mongoose.Schema({
    listID: String,
    name: String,
    description: String,
    userId: String,
    creation: Date,
    removed: Boolean
});

module.exports = mongoose.model('tasks', taskModel);