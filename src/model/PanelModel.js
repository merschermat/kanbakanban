const mongoose = require('mongoose')

// Create task schema 
const panelModel = mongoose.Schema({
    name: String,
    description: String,
    userId: String,
    creation: Date,
    removed: Boolean
});

module.exports = mongoose.model('panels', panelModel);