const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const produitEnStockSchema = new mongoose.Schema({
    produit:{
        type: ObjectId,
        required: true,
        ref: 'Produit'
    },
    facture:{
        type: ObjectId,
        required: false, 
        ref: 'Facture'
    },
    bonDeCommande:{
        type: ObjectId,
        required: false, 
        ref: 'bonDeCommande'
    },
    bonDeLivraison:{
        type: ObjectId,
        required: false, 
        ref: 'BonLivraison'
    },
    prixVente:{
        type: Number,
        required: false,
    },
    prixAchat:{
        type: Number,
        required: false,
    },
    quantite:{
        type: Number,
        required: false,
        min:1
    }
})

const ProduitEnStock = mongoose.model('ProduitEnStock', produitEnStockSchema);

module.exports = ProduitEnStock;