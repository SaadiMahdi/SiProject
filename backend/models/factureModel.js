const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const factureSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    fournisseur: {
        type: ObjectId,
        ref: "Fournisseur",
        required: true,
    },
    montantFacture:{
        type: Number,
        required: true
    }
})

const Facture = mongoose.model('Facture',factureSchema)

module.exports = Facture