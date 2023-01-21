const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const reglementSchema = new mongoose.Schema({
    date:{
        type: Date,
        default: Date.now()
    },
    facture:{
        type: ObjectId,
        ref: "Facture" ,
        required: true
    },
})

const Reglement = mongoose.model('Reglement',reglementSchema)

module.exports = Reglement