const mongoose = require('mongoose');


const transactionSchema = new mongoose.Schema({
    date: Date,
    listProduits:[
        {
            id: { type: ObjectId, ref: "Produit" },
            quantite: Number,
            prixHT: Number,
            prixVente: Number
        }
    ],
    client: {
        type: ObjectId,
        ref: "Client",
        required: true,
    },
})

const Transaction = mongoose.model('Transaction',transactionSchema)

module.exports = Transaction