const express = require('express');
const produitController = require('./../controllers/produitControllers');
const router = express.Router();

router
  .route('/')
  .get(produitController.getAllProduits)
  .post(produitController.createProduit);

router
  .route('/:id')
  .get(produitController.getProduit)
  .patch(produitController.updateProduit)
  .delete(produitController.deleteProduit);

module.exports = router;