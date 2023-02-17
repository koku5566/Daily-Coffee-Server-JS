//router use to define Api endpoint

import express from 'express';

import { signup, login, isAuth } from '../controller/auth.js';

const router = express.Router();

router.post('/login', login);

router.post('/signup', signup);

router.get('/private', isAuth);

router.get('/public', (req,res,next) =>{
    res.status(200).json({message: "Here is your public resource" });
});

router.use('/', (req,res,next) => {
    res.status(404).json({error : "page not found"});
});

export default router;