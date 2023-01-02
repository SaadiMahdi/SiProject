const express = require('express');
const categorieController = require('./../controllers/categorieControllers');
const router = express.Router();

router
  .route('/')
  .get(categorieController.getAllCategories)
  .post(categorieController.createCategorie);

router
  .route('/:id')
  .get(categorieController.getCategorie)
  .patch(categorieController.updateCategorie)
  .delete(categorieController.deleteCategorie);

module.exports = router;