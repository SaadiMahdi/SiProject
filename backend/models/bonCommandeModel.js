const mongoose = require('mongoose');


const bcSchema = new mongoose.Schema({
    listProduits:[
        {
            id: { type: ObjectId, ref: "Product" },
            quantite:  {
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
})

const bonDeCommande = mongoose.model('bonDeCommande',bcSchema)

module.exports = bonDeCommande