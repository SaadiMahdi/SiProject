const Produit = require('./../models/ProduitModel');
const mongoose = require('mongoose');

exports.getAllProduits = async (req, res) => {
  try {
    const produits = await Produit.find({})
    .populate("categorie")

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

exports.getProduit = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id)
    .populate('categorie')

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

exports.getProduitByCategorie = async (req, res) => {
  try {
    const produit = await Produit.find({categorie: req.params.id})
    .populate('categorie')

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

// delete multiple produits by passing an array of ids

exports.deleteProduits = async (req, res) => {
  try {

    await Produit.deleteMany({ _id: { $in: req.body } });

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
}