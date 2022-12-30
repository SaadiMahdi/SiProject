const mongoose = require('mongoose');


const blSchema = new mongoose.Schema({
    date: Date,
    listProduits:[
        {
            id: { type: ObjectId, ref: "Produit" },
            quantite: Number,
            prixHT: Number,
            prixVente: Number
        }
    ],
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
    }
})

const BonLivraison = mongoose.model('BonLivraison',blSchema)

module.exports = BonLivraison