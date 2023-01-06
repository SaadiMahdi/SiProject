const transaction = require("./../models/transactionModel");

exports.getAllTransactions = async (req, res) => {
  try {
    const tr = await transaction
      .find({})
      .populate("client", "_id")
      .populate("listeProduits.id", "_id");

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
      .populate("listeProduits.id", "_id");

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

exports.createTransaction = async (req, res) => {
  try {
    const newTransaction = await transaction.create(req.body);

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