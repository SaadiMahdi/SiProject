const Produit = require('./../models/ProduitModel');



exports.getAllProduits = async (req, res) => {
  try {
    const produit = await Produit.find().populate('categorie', '_id designation')

    res.status(200).json({
      status: 'success',
      results: produit.length,
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

exports.getProduit = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id);

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

exports.createProduit = async (req, res) => {
  try {

    const newProduit = await Produit.create(req.body);

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

exports.updateProduit = async (req, res) => {
  try {
    const produit = await Produit.findByIdAndUpdate(req.params.id, req.body, {
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

exports.deleteProduit = async (req, res) => {
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


