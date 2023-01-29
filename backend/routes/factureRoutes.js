const express = require('express');
const factureController = require('../controllers/factureControllers');
const router = express.Router();

router
  .route('/')
  .get(factureController.getAllFactures)
  .post(factureController.createFacture);
  
  router.get('/pdf/:id', factureController.generateFacturePdf);

router
  .route('/:id')
  .get(factureController.getFacture)
  .get(factureController.getFacturesByFournisseur)
  .patch(factureController.updateFacture)
  .delete(factureController.deleteFacture);

router
  .route('/factureTotal/:id')
  .get(factureController.calculateTotal);


router
  .route('/deleteMany')
  .post(factureController.deleteFactures);

module.exports = router;