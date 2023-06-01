//import express from 'express';
const express = require('express');

//import sequelize from './utils/db.js';
const sequelize = require('./server/utils/db');

//import router from './routes/routes.js';
const router = require('./server/routes/routes')

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Content-Type', 'application/json');
    next();
});

// app.use('/api',router);
app.use(router);
// console.log(router);

sequelize.sync().then(function(){
    console.log('DB connection sucessful.');
  }, function(err){
    // catch error here
    console.log('this is the error: '+err);
  });

const port = process.env.PORT;

app.listen(port); //must be const port = process.env.PORT; otherwise the IIS will have a different port than the node.

console.log(app.listen);
//const express = require('express')
//const app = express()
//const port = process.env.PORT 
//
//app.get('/', (req, res) => {
//  res.send('Hello World!')
//})
//
//app.listen(port, () => {
//  console.log(`Example app listening on port ${port}`)
//})