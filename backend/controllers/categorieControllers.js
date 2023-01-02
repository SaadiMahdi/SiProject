const Categorie = require('./../models/categorieModel');



exports.getAllCategories = async (req, res) => {
  try {
    const categorie = await Categorie.find()

    res.status(200).json({
      status: 'success',
      results: categorie.length,
      data: {
        categorie
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getCategorie = async (req, res) => {
  try {
    const categorie = await Categorie.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        categorie
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createCategorie = async (req, res) => {
  try {

    const newCategorie = await Categorie.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        categorie: newCategorie
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateCategorie = async (req, res) => {
  try {
    const categorie = await Categorie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        categorie
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteCategorie = async (req, res) => {
  try {
    await Categorie.findByIdAndDelete(req.params.id);

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

