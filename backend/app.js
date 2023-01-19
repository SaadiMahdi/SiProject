const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const fournisseurRouter = require('./routes/fournisseurRoutes');
const clientRouter = require('./routes/clientRoutes');
const categorieRouter = require('./routes/categorieRoutes');
const produitRouter = require('./routes/produitRoutes');
const bonCommandeRouter = require('./routes/bonCommandeRoutes');
const factureRouter = require('./routes/factureRoutes');
const produitEnStockRouter = require('./routes/produitEnStockRoutes');
const reglementRouter = require('./routes/reglementRoutes');
const transactionRouter = require('./routes/transactionRoutes');
const paiementRouter = require('./routes/paiementRoutes');
const bonLivraisonRouter = require('./routes/bonLivraisonRoutes');



const app = express();

// 1) MIDDLEWARES

app.use(express.json());
app.use(cors());


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTES
app.use('/api/v1/fournisseur', fournisseurRouter);
app.use('/api/v1/client', clientRouter);
app.use('/api/v1/categorie', categorieRouter);
app.use('/api/v1/produit', produitRouter);
app.use('/api/v1/produitEnStock', produitEnStockRouter);
app.use('/api/v1/bonCommande', bonCommandeRouter);
app.use('/api/v1/facture', factureRouter);
app.use('/api/v1/reglement', reglementRouter);
app.use('/api/v1/transaction', transactionRouter);
app.use('/api/v1/paiement', paiementRouter);
app.use('/api/v1/bonLivraison', bonLivraisonRouter);


module.exports = app;
