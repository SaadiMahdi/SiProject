const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const paiementSchema = new mongoose.Schema({
    date: Date,
    transaction:{
        type: ObjectId,
        ref:"Transaction",
        required: true
    },
})

const Paiement = mongoose.model('Paiement',paiementSchema)

module.exports = Paiement