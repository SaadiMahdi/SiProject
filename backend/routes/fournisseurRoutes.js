const express = require('express');
const fournisseurController = require('./../controllers/fournisseurControllers');
const router = express.Router();

router
  .route('/')
  .get(fournisseurController.getAllFournisseurs)
  .post(fournisseurController.createFournisseur);

router
  .route('/:id')
  .get(fournisseurController.getFournisseur)
  .patch(fournisseurController.updateFournisseur)
  .delete(fournisseurController.deleteFournisseur);

module.exports = router;