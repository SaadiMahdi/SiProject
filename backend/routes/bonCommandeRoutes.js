const express = require('express');
const bonDeCommandeController = require('../controllers/bonDeCommandeControllers');
const router = express.Router();

router
  .route('/')
  .get(bonDeCommandeController.getAllBons)
  .post(bonDeCommandeController.createBon);

router
  .route('/:id')
  .get(bonDeCommandeController.getBon)
  .patch(bonDeCommandeController.updateBon)
  .delete(bonDeCommandeController.deleteBon);

router
  .route('/deleteMany')
  .post(bonDeCommandeController.deleteBons);

module.exports = router;