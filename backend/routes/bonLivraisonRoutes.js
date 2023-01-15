const express = require('express');
const bonLivraisonController = require('../controllers/bonLivraisonControllers');
const router = express.Router();

router
  .route('/')
  .get(bonLivraisonController.getAllBons)
  .post(bonLivraisonController.createBon);

router
  .route('/:id')
  .get(bonLivraisonController.getBon)
  .patch(bonLivraisonController.updateBon)
  .delete(bonLivraisonController.deleteBon);

module.exports = router;