const mongoose = require('mongoose');


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
    montantFacture:{
        type: Number,
        required: true
    }
})

const BonLivraison = mongoose.model('BonLivraison',blSchema)

module.exports = BonLivraison