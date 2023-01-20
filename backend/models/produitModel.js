const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const produitSchema = new mongoose.Schema({
    designation: {
        type: String,
        required: true,
        trim: true,
        unique: [true, 'Ce produit existe déjà']
     },
    categorie:{
        type: ObjectId,
        required: false,
        ref: 'Categorie'
    }
})

const Produit = mongoose.model('Produit', produitSchema);

module.exports = Produit;