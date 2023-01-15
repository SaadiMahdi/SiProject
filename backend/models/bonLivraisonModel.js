const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const blSchema = new mongoose.Schema({
    date: Date,
    fournisseur: {
        type: ObjectId,
        ref: "Fournisseur",
        required: true,
    },
    etat:{
        type: String,
        enum:[
            'réglé',
            'non réglé'
        ]
    },
    listeProduits: [
        {
            id: { type: ObjectId, ref: "ProduitEnStock" },
            quantite: {
                type: Number,
                required: true,
            },
        },
    ],
})

const BonLivraison = mongoose.model('BonLivraison',blSchema)

module.exports = BonLivraison