const express = require('express');
const morgan = require('morgan');


const app = express();

// 1) MIDDLEWARES

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


module.exports = app;
