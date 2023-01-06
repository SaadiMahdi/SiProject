const express = require('express');
const reglementController = require('./../controllers/reglementControllers');
const router = express.Router();

router
  .route('/')
  .get(reglementController.getAllReglement)
  .post(reglementController.createReglement);

router
  .route('/:id')
  .get(reglementController.getReglement)
  .patch(reglementController.updateReglement)
  .delete(reglementController.deleteReglement);

module.exports = router;