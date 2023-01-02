const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const produitSchema = new mongoose.Schema({
    designation: {
        type: String,
        required: true,
        trim: true
     },
    categorie:{
        type: ObjectId,
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