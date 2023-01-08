const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const reglementSchema = new mongoose.Schema({
    date:{
        type: Date,
        default: Date.now()
    },
    facture:{
        type: ObjectId,
        ref: "Produit" 
    },
    montant: {
        type: Number,
    }
})

const Reglement = mongoose.model('Reglement',reglementSchema)

module.exports = Reglement