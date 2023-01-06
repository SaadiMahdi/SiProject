const express = require('express');
const paiementController = require('./../controllers/paiementControllers');
const router = express.Router();

router
  .route('/')
  .get(paiementController.getAllPaiement)
  .post(paiementController.createPaiement);

router
  .route('/:id')
  .get(paiementController.getPaiement)
  .patch(paiementController.updatePaiement)
  .delete(paiementController.deletePaiement);

module.exports = router;