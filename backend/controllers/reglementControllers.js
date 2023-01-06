const Reglement = require("./../models/reglementModel");

exports.getAllReglement = async (req, res) => {
  try {
    const reglements = await Reglement
      .find({})
      .populate("facture", "_id ")
    res.status(200).json({
      status: "success",
      results: reglements.length,
      data: {
        reglements,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getReglement = async (req, res) => {
  try {
    const reglement = await Reglement
      .findById(req.params.id)
      .populate("facture", "_id ")

    res.status(200).json({
      status: "success",
      data: {
        reglement,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createReglement = async (req, res) => {
  try {
    const newReglement = await Reglement.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        bon: newReglement,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateReglement = async (req, res) => {
  try {
    const reglement = await Reglement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        reglement,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteReglement = async (req, res) => {
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
