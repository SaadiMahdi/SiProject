const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const factureSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    fournisseur: {
        type: ObjectId,
        ref: "Fournisseur",
        required: true,
    },
    listeProduits: [
        {
            produit: { type: ObjectId, ref: "Produit" },
            prix: {
                type: Number,
                required: true,
                min:1,
            },
            quantite: {
                type: Number,
                required: true,
                min:1
            },
        },
    ],
})

const Facture = mongoose.model('Facture',factureSchema)

module.exports = Facture