//import bcrypt from 'bcryptjs';
const bcrypt = require('bcryptjs');

//import jwt from 'jsonwebtoken'; //seems like use to stay login etc
const jwt = require('jsonwebtoken');

//const JsonWebTokenError =require('jsonwebtoken');
const multer = require('multer');

const User = require('../model/user');
const News = require('../model/news');

const signup = (req, res, next) => {
    console.log('ehhhh?')
    //Check if email already exists
    User.findOne({
        where: {
            email: req.body.email,
        }
    })
        .then(dbUser => {
            if (dbUser) {
                return res.status(409).json({ message: "Email Exists" });
            }
            else if (req.body.email && req.body.password) {
                //password hash
                bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
                    if (err) {
                        return res.status(500).json({ message: "Couldnt hash the password" });
                    }
                    else if (passwordHash) {
                        return User.create(({
                            email: req.body.email,
                            phoneNum: req.body.phoneNum,
                            name: req.body.name,
                            password: passwordHash,
                        }))
                            .then(() => {
                                res.status(200).json({ message: "User Created" });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(502).json({ message: "error while creating the user" });
                            });
                    };
                });
            }
            else if (!req.body.password) {
                return res.status(400).json({ message: "Password not provided" });
            }
            else if (!req.body.email) {
                return res.status(400).json({ message: "Email not provided" });
            };
        })
        .catch(err => {
            console.log('error', err);
        });
};

// //test
// const signup = (req, res, next) => {
//     return res.status(200).json({message: "Sign up can work" });
// };

const login = (req, res, next) => {
    //checks if email exists
    User.findOne({
        where: {
            email: req.body.email,
        }
    })
        .then(dbUser => {
            if (!dbUser) {
                return res.status(404).json({ message: "User not found" });
            }
            else {
                //password Hash
                bcrypt.compare(req.body.password, dbUser.password, (err, compareRes) => {
                    if (err) {
                        res.status(502).json({ message: "Error while checking user password" });
                    }
                    else if (compareRes) {
                        const token = jwt.sign({ email: req.body.email }, 'secret', { expiresIn: '1h' });
                        res.status(200).json({ message: "User Logged in", "token": token });
                    }
                    else {
                        res.status(401).json({ message: "Invalid Credentials" });
                    };
                });
            };
        })
        .catch(err => {
            console.log(' any error', err);
        });
};

const isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: 'not authenticated' });
    };
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'secret');
    } catch (err) {
        return res.status(500).json({ message: err.message || 'could not decode the token' });
    };
    if (!decodedToken) {
        res.status(401).json({ message: 'Unauthorized' });
    }
    else {
        res.status(200).json({ message: 'here is your resources' });
    };
};
// configure the multer middleware to store files in memory
const upload = multer({ storage: multer.memoryStorage() });

const addNews = ( req, res, next)=>{
    console.log(req.body);
    upload.single('newsImage')(req,res,err=>{
        if (err instanceof multer.MulterError) {
            // handle any multer errors
            console.error('Multer error:', err);
            res.status(500).json({ message: 'Error uploading file.' });
          } else if (err) {
            // handle any other errors
            console.error('Upload error:', err);
            res.status(500).json({ message: 'Error uploading file.' });
          } else {
            // extract the file data from the request and create the news object
            const news = {
              newsTitle: req.body.newsTitle,
              newsContent: req.body.newsContent,
              newsImage: req.file.buffer,
            };
            News.create(news)
                .then(() => {
                    res.status(200).json({ message: "News Created" });
                })
                .catch(err => {
                    console.log(err);
                    res.status(502).json({ message: "error while creating the news" });
                });
        }
      
    })
   
}
module.exports = {
    signup, login, isAuth, addNews
};