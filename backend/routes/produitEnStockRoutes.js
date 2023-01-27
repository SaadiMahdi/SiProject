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
router
  .route('/deleteMany')
  .post(produitEnStockController.deleteProduitsEnStock);

module.exports = router;