const Paiement = require("./../models/paiementModel");

exports.getAllPaiement = async (req, res) => {
  try {
    const paiements = await Paiement
      .find({})
      .populate("facture", "_id ")
    res.status(200).json({
      status: "success",
      results: paiements.length,
      data: {
        paiements,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getPaiement = async (req, res) => {
  try {
    const paiement = await Paiement
      .findById(req.params.id)
      .populate("facture", "_id ")

    res.status(200).json({
      status: "success",
      data: {
        paiement,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createPaiement = async (req, res) => {
  try {
    const newPaiement = await Paiement.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        bon: newPaiement,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updatePaiement = async (req, res) => {
  try {
    const paiement = await Paiement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        paiement,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deletePaiement = async (req, res) => {
  try {
    await Paiement.findByIdAndDelete(req.params.id);

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
