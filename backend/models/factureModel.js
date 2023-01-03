const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const factureSchema = new mongoose.Schema({
    date: Date,
    listeProduits:[
        {
            produit: { 
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
        ],
        required: true
    }
})

const Facture = mongoose.model('Facture',factureSchema)

module.exports = Facture