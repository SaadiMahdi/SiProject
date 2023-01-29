const bonDeCommande = require("./../models/bonCommandeModel");

exports.getAllBons = async (req, res) => {
  try {
    const bons = await bonDeCommande
      .find({})
      .populate("fournisseur", "_id name")
      .populate("listeProduits.produit", "_id designation");

    res.status(200).json({
      status: "success",
      results: bons.length,
      data: {
        bons,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getBon = async (req, res) => {
  try {
    const bon = await bonDeCommande
      .findById(req.params.id)
      .populate("fournisseur", "_id name")
      .populate("listeProduits.produit", "_id designation");

    res.status(200).json({
      status: "success",
      data: {
        bon,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createBon = async (req, res) => {
  try {
    const newBon = await bonDeCommande.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        bon: newBon,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateBon = async (req, res) => {
  try {
    const bon = await bonDeCommande.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        bon,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteBon = async (req, res) => {
  try {
    await bonDeCommande.findByIdAndDelete(req.params.id);

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


exports.deleteBons = async (req, res) => {
  try {
    console.log(req.body)
    await bonDeCommande.deleteMany({ _id: { $in: req.body } });

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