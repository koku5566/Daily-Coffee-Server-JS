//router use to define Api endpoint

//import express from 'express';
const express = require('express');

//const { signup, login, isAuth } = require('../controller/auth');
const auth = require('../controller/auth');
const otp = require('../controller/loginModel');
const news = require('../controller/news');

const sequelize = require('../utils/db');

const router = express.Router();

// router.post('/login', auth.login);

router.post('/signup', auth.signup);

router.get('/private', auth.isAuth);

router.get('/publicsss', (req,res,next) =>{
    res.status(200).json({message: "Here is your public resourcessss" });
});

router.post('/otp',otp.getOTPSMS);
router.post('/verify',otp.verifyOTP);
router.post('/register',otp.SignUp);



router.get('/news', news.getNews);
//router.use('/', (req,res,next) => {
//    res.status(405).json({error : "page not found"});
//});

router.get('/tester', (req,res,next) => {
    res.status(200).json({message : "page not found"});
});

module.exports = router;