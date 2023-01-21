const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const factureSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    fournisseur: {
        type: ObjectId,
        ref: "Fournisseur",
        required: true,
    },
    listeProduits: [
        {
            produit: { type: ObjectId, ref: "Produit" },
            prixAchat: {
                type: Number,
                required: true,
                min:1,
            },
            prixVente: {
                type: Number,
                required: true,
                min:1,
            },
            quantite: {
                type: Number,
                min:1
            },
        },
    ],
})

// factureSchema.pre('save', async function(next){
//     const facture = this
//     const ProduitEnStock = require('./produitEnStockModel')

//     facture.listeProduits.forEach(async (produit) => {
// try
//         {        const produitEnStock = await ProduitEnStock.findOne({produit: produit.produit})
//         if(produitEnStock){
//             produitEnStock.quantite += produit.quantite
//             await produitEnStock.save()
//         }else{
//             const newProduitEnStock = await ProduitEnStock.create({
//                 produit: produit.produit,
//                 quantite: produit.quantite,
//                 prixVente: produit.prixVente,
//                 prixAchat: produit.prixAchat
//             })
//             await newProduitEnStock.save();
//         }
// }
// catch(err){
//     console.log(err)
// }
//     })
//     next()
// })



const Facture = mongoose.model('Facture',factureSchema)

module.exports = Facture