const Fournisseur = require('./../models/fournisseurModel');



exports.getAllFournisseurs = async (req, res) => {
  try {
    const fournisseurs = await Fournisseur.find()

    res.status(200).json({
      status: 'success',
      results: fournisseurs.length,
      data: {
        fournisseurs
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getFournisseur = async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        fournisseur
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createFournisseur = async (req, res) => {
  try {

    const newFournisseur = await Fournisseur.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        fournisseur: newFournisseur
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateFournisseur = async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        fournisseur
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteFournisseur = async (req, res) => {
  try {
    await Fournisseur.findByIdAndDelete(req.params.id);

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

