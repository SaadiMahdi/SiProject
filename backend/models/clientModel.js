const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    nom: {
       type: String,
       required: [true,'please anter your name'],
       trim: true,
       lowercase: true
     },
    prenom: {
        type: String,
        required: [true,'please anter your name'],
        trim: true,
        lowercase: true
    },
    addrese:{
        type: String,
        required: [true,'please anter your address'],
        trim: true,
        lowercase: true
    },
    telephone:{
        type: Number,
        required: [true,'please anter your phone number'],
    },
    credit:{
        type: Number,
        default:0,
    }
})

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;