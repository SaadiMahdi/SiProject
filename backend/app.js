const express = require('express');
const morgan = require('morgan');
const fournisseurRouter = require('./routes/fournisseurRoutes');
const clientRouter = require('./routes/clientRoutes');
const categorieRouter = require('./routes/categorieRoutes');
const produitRouter = require('./routes/produitRoutes');


const app = express();

// 1) MIDDLEWARES

app.use(express.json());


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTES
app.use('/api/v1/fournisseur', fournisseurRouter);
app.use('/api/v1/client', clientRouter);
app.use('/api/v1/categorie', categorieRouter);
app.use('/api/v1/produit', produitRouter);


module.exports = app;
