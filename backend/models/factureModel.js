const mongoose = require('mongoose');


const factureSchema = new mongoose.Schema({
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

const Facture = mongoose.model('Facture',factureSchema)

module.exports = Facture