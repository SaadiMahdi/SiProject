const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
    designation:{
        type: String,
        required: true,
        trim: true
    }
})

const Type = mongoose.model('Type', produitSchema);

module.exports = Type;