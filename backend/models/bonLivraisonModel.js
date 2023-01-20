const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const blSchema = new mongoose.Schema({
    date: Date,
    fournisseur: {
        type: ObjectId,
        ref: "Fournisseur",
        required: true,
    },
    listeProduits: [
        {
            produit: { type: ObjectId, ref: "Produit" },
            quantite: {
                type: Number,
                required: true,
            },
        },
    ],
})

const BonLivraison = mongoose.model('BonLivraison',blSchema)

module.exports = BonLivraison