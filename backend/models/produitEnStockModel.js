const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


let produitEnStockSchema = new mongoose.Schema({
    produit:{
        type: ObjectId,
        required: true,
        ref: 'Produit'
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

let produitEnStock;

module.exports = () => {
  if (!produitEnStock) {
    produitEnStock = mongoose.model("ProduitEnStock", produitEnStockSchema);
  }
  return produitEnStock;
}