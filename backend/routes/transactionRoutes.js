const express = require('express');
const transactionController = require('./../controllers/transactionController');
const router = express.Router();

router
  .route('/')
  .get(transactionController.getAllTransactions)
  .post(transactionController.createTransaction);

router
  .route('/:id')
  .get(transactionController.getTransaction)
  .patch(transactionController.updateTransaction)
  .delete(transactionController.deleteTransaction);
  
  // .get(transactionController.getTransactionsByClient)

router
  .route('/deleteMany')
  .post(transactionController.deleteTransactions);


module.exports = router;