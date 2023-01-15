const ProduitEnStock = require('./../models/ProduitEnStockModel');



exports.getAllProduitsEnStock = async (req, res) => {
  try {
    const produits = await ProduitEnStock.find({})
    .populate("produit")

    res.status(200).json({
      status: 'success',
      results: produits.length,
      data: {
        produits
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getProduitEnStock = async (req, res) => {
  try {
    const produit = await ProduitEnStock.findById(req.params.id)
    .populate("produit")

    res.status(200).json({
      status: 'success',
      data: {
        produit
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createProduitEnStock = async (req, res) => {
  try {

    const newProduit = await ProduitEnStock.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        produit: newProduit
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateProduitEnStock = async (req, res) => {
  try {
    const produit = await ProduitEnStock.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        produit
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteProduitEnStock = async (req, res) => {
  try {
    await Produit.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
