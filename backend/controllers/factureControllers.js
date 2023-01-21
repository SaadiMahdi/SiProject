const Facture = require("./../models/factureModel");

exports.getAllFactures = async (req, res) => {
  try {
    const factures = await Facture
      .find({})
      .populate("fournisseur", "_id name")
      .populate("listeProduits.produit", "_id designation");

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
      .populate("fournisseur", "_id name")
      .populate("listProduits.produit", "_id designation");

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

exports.createFacture = async (req, res) => {
  try {
    const newFacture = await Facture.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        bon: newFacture,
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
