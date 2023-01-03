const mongoose = require('mongoose');

const fournisseurSchema = new mongoose.Schema({
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
    address:{
        type: String,
        required: [true,'please anter your address'],
        trim: true,
        lowercase: true
    },
    telephone:{
        type: Number,
        required: [true,'please anter your phone number'],
    },
})

const Fournisseur = mongoose.model('Fournisseur', fournisseurSchema);

module.exports = Fournisseur;