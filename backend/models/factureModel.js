const mongoose = require('mongoose');


const factureSchema = new mongoose.Schema({
    date: Date,
    listProduits:[
        {
            id: { 
                type: ObjectId, 
                ref: "Produit" 
            },
            quantite:  {
                type: Number,
                required: true
            },
            prixHT:  {
                type: Number,
                required: true
            },
            prixVente:  {
                type: Number,
                required: true
            },
            required: true
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