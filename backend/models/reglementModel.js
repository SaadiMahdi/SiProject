const mongoose = require('mongoose');


const reglementSchema = new mongoose.Schema({
    date: Date,
    facture:{
        type: ObjectId,
        ref: "Produit" 
    },
    montant: Number
})

const Reglement = mongoose.model('Reglement',reglementSchema)

module.exports = Reglement