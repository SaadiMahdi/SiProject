const { findById } = require("../models/fournisseurModel");
const transaction = require("./../models/transactionModel");
const ProduitEnStock = require("./../models/produitEnStockModel")();
const Client = require("./../models/clientModel")();

exports.getAllTransactions = async (req, res) => {
  try {
    const tr = await transaction
      .find({})
      .populate("client", "_id")
      .populate("listeProduits.produit", "_id");

    res.status(200).json({
      status: "success",
      results: tr.length,
      data: {
        tr,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const tr = await transaction
      .findById(req.params.id)
      .populate("client", "_id")
      .populate("listeProduits.produit", "_id");

    res.status(200).json({
      status: "success",
      data: {
        tr,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getTransactionsByClient = async (req, res) => {
  try {
    const tr = await transaction
      .find({ client: req.params.id })
      .populate("client", "_id")
      .populate("listeProduits.produit", "_id");

    res.status(200).json({
      status: "success",
      results: tr.length,
      data: {
        tr,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};



// exports.createTransaction = async (req, res) => {
//   try {
//     const newTransaction = await transaction.create(req.body);

//     const listeProduits = req.body.listeProduits;

//     const updatePromises = listeProduits.map(async (produit) => {
//       return await ProduitEnStock.updateOne(
//         { _id: produit.produit, quantite: { $gte: produit.quantite } },
//         { $inc: { quantite: -produit.quantite } }
//       );
//     });

//     await Promise.all(updatePromises);

//     res.status(201).json({
//       status: "success",
//       data: {
//         tr: newTransaction,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };

exports.createTransaction = async (req, res) => {
  try {
    const newTransaction = await transaction.create(req.body);
      
    const listeProduits = req.body.listeProduits;
    listeProduits.forEach(async (produit) => {
      const produitEnStock = await ProduitEnStock.findById(produit.produit);
      if (produitEnStock.quantite >= produit.quantite) {
        produitEnStock.quantite -= produit.quantite;
        await produitEnStock.save();
      }
      else{
        throw new Error ("Quantite insuffisante");
      }
    });

    res.status(201).json({
      status: "success",
      data: {
        tr: newTransaction,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};


exports.updateTransaction = async (req, res) => {
  try {
    const tr = await transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        tr,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    await transaction.findByIdAndDelete(req.params.id);

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