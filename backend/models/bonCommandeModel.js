const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const bcSchema = new mongoose.Schema({
  listeProduits: [
    {
      id: { type: ObjectId, ref: "ProduitEnStock" },
      quantite: {
        type: Number,
        required: true,
      },
    },
  ],
  fournisseur: {
    type: ObjectId,
    ref: "Fournisseur",
    required: true,
  },
});

const bonDeCommande = mongoose.model("bonDeCommande", bcSchema);

module.exports = bonDeCommande;
