const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const transactionSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    listeProduits:[
        {
            produit: { 
                    type: ObjectId,
                    ref: "ProduitEnStock"
                },
            quantite: {
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