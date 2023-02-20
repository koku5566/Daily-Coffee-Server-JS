//router use to define Api endpoint

//import express from 'express';
const express = require('express');

//const { signup, login, isAuth } = require('../controller/auth');
const auth = require('../controller/auth');


const router = express.Router();

router.post('/login', auth.login);

router.get('/signup', auth.signup);

router.get('/private', auth.isAuth);

router.get('/public', (req,res,next) =>{
    res.status(200).json({message: "Here is your public resource" });
});

router.use('/test', (req,res,next) => {
    res.status(200).json({message : "page not found"});
});

module.exports = router;