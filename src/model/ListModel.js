const mongoose = require('mongoose')

// Create task schema 
const listModel = mongoose.Schema({
    panelID: String,
    name: String,
    description: String,
    useId: String,
    creation: Date,
    removed: Boolean
});

module.exports = mongoose.model('lists', listModel);