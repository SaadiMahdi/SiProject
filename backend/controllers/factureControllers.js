const Facture = require("./../models/factureModel");
const ProduitEnStock = require("./../models/produitEnStockModel")();


exports.calculateTotal = async (req, res) => {
  try {
      const facture = await Facture.findById(req.params.id);
      let total = 0;
      facture.listeProduits.forEach((item) => {
          total += item.prixAchat * item.quantite;
      });
      res.send({ total });
  } catch (error) {
      res.status(500).send(error);
  }
};

exports.getAllFactures = async (req, res) => {
  try {
    const factures = await Facture
      .find({})
      .populate("fournisseur", "_id name ")
      .populate({
        path: "listeProduits",
        populate: {
          path: "produit",
          select: "_id designation",
        },
      })
    res.status(200).json({
      status: "success",
      results: factures.length,
      data: {
        factures,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getFacture = async (req, res) => {
  try {
    const facture = await Facture
      .findById(req.params.id)
      .populate("fournisseur", "_id name phone")
      .populate({
        path: "listeProduits",
        populate: {
          path: "produit",
          select: "_id designation",
        },
      })

      console.log(facture.listeProduits.produit);


    res.status(200).json({
      status: "success",
      data: {
        facture,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getFacturesByFournisseur = async (req, res) => {
  try {
    const factures = await Facture
      .find({ fournisseur: req.params.id })
      .populate("fournisseur", "_id name")
      .populate("listProduits.produit", "_id designation");

    res.status(200).json({
      status: "success",
      results: factures.length,
      data: {
        factures,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// exports.createFacture = async (req, res) => {
//   try {
//     const newFacture = await Facture.create(req.body);
//     res.status(201).json({
//       status: "success",
//       data: {
//         bon: newFacture,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };

// exports.createFacture = async (req, res) => {
//   try {
//     const newFacture = await Facture.create(req.body);
//     const listeProduits = newFacture.listeProduits;
//     listeProduits.forEach(async (produit) => {
//       const produitEnStock = await ProduitEnStock.findOne({
//         produit: produit._id,
//       });
//       if (produitEnStock) {
//         produitEnStock.quantite += produit.quantite;
//         await produitEnStock.save();
//       } else {
//         const newProduitEnStock = await ProduitEnStock.create({
//           produit: produit,
//           quantite: produit.quantite,
//           prixVente: produit.prixVente,
//           prixAchat: produit.prixAchat,
//         });
//         newProduitEnStock.save();
//       }
//     });
//     res.status(201).json({
//       status: "success",
//       data: {
//         facture: newFacture,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };
exports.createFacture = async (req, res) => {
  try {
    const newFacture = await Facture.create(req.body);
    const listeProduits = newFacture.listeProduits;
    listeProduits.forEach(async (produit) => {
      const produitEnStock = await ProduitEnStock.findOne({
        produit: produit.produit._id,
        prixAchat: produit.prixAchat,
      });
      if (produitEnStock) {
        produitEnStock.quantite += produit.quantite;
        await produitEnStock.save();
      } else {
        const newProduitEnStock = await ProduitEnStock.create({
          produit: produit.produit._id,
          quantite: produit.quantite,
          prixVente: produit.prixVente,
          prixAchat: produit.prixAchat,
        });
        newProduitEnStock.save();
      }
    });
    res.status(201).json({
      status: "success",
      data: {
        facture: newFacture,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateFacture = async (req, res) => {
  try {
    const facture = await Facture.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        facture,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteFacture = async (req, res) => {
  try {
    await Facture.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
