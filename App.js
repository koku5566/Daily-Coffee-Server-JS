////import express from 'express';
//const express = require('express');
//
////import sequelize from './utils/db.js';
//const sequelize = require('./server/utils/db');
//
////import router from './routes/routes.js';
//const router = require('./server/routes/routes')
//
//const app = express();
//
//app.use(express.urlencoded({ extended: true }));
//
//app.use(express.json());
//
//app.use((req, res, next) => {
//    res.setHeader('Access-Control-Allow-Origin', '*');
//    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//    next();
//});
//
//
//app.use('/api',router);
//console.log(router);
//
//sequelize.sync()
//
//app.listen(5000);

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})