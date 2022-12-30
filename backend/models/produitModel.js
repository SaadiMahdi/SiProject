const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
    designation: {
        type: String,
        required: true,
        trim: true
     },
    type:{
        type: objectId,
        required: true,
        ref: 'Type'
    },
    prixUnitaire:{
        type: Number,
        required: [true,'please anter the price'],
    }
})

const Produit = mongoose.model('Produit', produitSchema);

module.exports = Produit;