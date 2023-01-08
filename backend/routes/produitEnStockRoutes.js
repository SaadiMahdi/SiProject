const express = require('express');
const produitEnStockController = require('./../controllers/produitEnStockController');
const router = express.Router();

router
  .route('/')
  .get(produitEnStockController.getAllProduitsEnStock)
  .post(produitEnStockController.createProduitEnStock);

router
  .route('/:id')
  .get(produitEnStockController.getProduitEnStock)
  .patch(produitEnStockController.updateProduitEnStock)
  .delete(produitEnStockController.deleteProduitEnStock);

module.exports = router;