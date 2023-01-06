const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const paiementSchema = new mongoose.Schema({
    date: Date,
    client: {
        type: ObjectId,
        ref: "Client",
        required: true,
    },
    montant:{
        type: Number,
        required:true
    }
})

const Paiement = mongoose.model('Paiement',paiementSchema)

module.exports = Paiement