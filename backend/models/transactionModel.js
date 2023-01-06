const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const transactionSchema = new mongoose.Schema({
    date: Date,
    listProduits:[
        {
            id: { 
                    type: ObjectId,
                    ref: "Produit"
                },
            quantite: {
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
    client: {
        type: ObjectId,
        ref: "Client",
        required: true,
    },
})

const Transaction = mongoose.model('Transaction',transactionSchema)

module.exports = Transaction