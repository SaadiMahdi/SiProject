const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const bcSchema = new mongoose.Schema({
  listeProduits: [
    {
      produit: { type: ObjectId, ref: "Produit" },
      quantite: {
        type: Number,
        required: false,
      },
    },
  ],
  fournisseur: {
    type: ObjectId,
    ref: "Fournisseur",
    required: true,
  },
  date: {
    type: Date,
    required: false,
  },
});

const bonDeCommande = mongoose.model("bonDeCommande", bcSchema);

module.exports = bonDeCommande;
