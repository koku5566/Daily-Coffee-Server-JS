const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const vonage = require('../model/vonageTest')
const OTP = require('../model/OTP')
const User = require('../model/user')

//generate 4 digit random otp
const generateCode = () => Math.floor(Math.random() * 9000) + 1000;


// //Send OTP to the phone number
// const getOTPSMS = (req, res, next) => {

//     //generate and get OTP Code
//     const code = generateCode();


//     const from = 'Vonage APIs';
//     const to = req.body.phone;
//     const text = `Your One-Time-Pin (OTP) for Daily Coffee Apps is ${code}. Valid for 5 Minutes ONLY`;

//     //send SMS to User
//     vonage.sms.send({ to, from, text })

//         //if works (SMS Sent Out)
//         .then(resp => {

//             //store OTP to DB
//             OTP.findOne({
//                 where: {
//                     phoneNum: req.body.phone,
//                 }
//             })
//             .then(dbOTP => {

//                 //if user got send OTP Before
//                 if(dbOTP){
//                     dbOTP.update({
//                         OTP: code,
//                         dateRequest: Date.now(),
//                     })

//                     .then(() =>{
//                         res.status(200).json({ message: `An OTP SMS had been sent to ${to} successfully`});
//                     })
//                     .catch(err => {
//                         console.log(err);
//                         res.status(502).json({ message: "Error While storing OTP to DB. Contact Support"});
//                     });

//                 }

//                 // if not insert new record
//                 else
//                 {
//                     OTP.create({
//                         phoneNum: req.body.phone,
//                         OTP: code,
//                         dateRequest: Date.now(),
//                     })
//                     .then(() =>{
//                         res.status(200).json({ message: `An OTP SMS had been sent to ${to} successfully`});
//                     })
//                     .catch(err => {
//                         console.log(err);
//                         res.status(502).json({ message: "Error While storing OTP to DB. Contact Support"});
//                     });
//                 }
//             })
//             .catch(err => {
//                 console.log('error', err);
//             });

//             console.log('Message sent successfully' + code);
//             console.log(resp);

//         })

//         .catch(err => {
//             console.log('There was an error sending the messages.');
//             console.error(err);
//         });

// };

const getOTPSMS = (req, res, next) => {

    //generate and get OTP Code
    const code = generateCode();

    OTP.findOne({
        where: {
            phoneNum: req.body.phone,
        }
    })
        .then(dbOTP => {

            //if user got send OTP Before
            if (dbOTP) {
                dbOTP.update({
                    OTP: code,
                    dateRequest: Date.now(),
                })

                    .then(() => {
                        res.status(200).json({ message: `An OTP SMS had been sent to  successfully` });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(502).json({ message: "Error While storing OTP to DB. Contact Support" });
                    });

            }

            // if not insert new record
            else {
                OTP.create({
                    phoneNum: req.body.phone,
                    OTP: code,
                    dateRequest: Date.now(),
                })
                    .then(() => {
                        res.status(200).json({ message: `An OTP SMS had been sent to ${req.body.phone} successfully` });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(502).json({ message: "Error While storing OTP to DB. Contact Support" });
                    });
            }
        })
        .catch(err => {
            console.log('error', err);
        });

    console.log('Message sent successfully ' + code);

};

//Verify OTP 
const verifyOTP = (req, res, next) => {

    const otpReceived = req.body.otp;

    OTP.findOne({
        where: {
            phoneNum: req.body.phone
        }
    })
        .then(dbOTP => { 
            if (dbOTP) {
                const timeReq = dbOTP.dateRequest;
                //get time difference to expired the code
                const timediff = (Date.now() - timeReq.getTime()) / 1000 / 60;

                //if the code is not expired
                if (timediff <= 5) {
                    if (otpReceived === dbOTP.OTP) {
                        //to check is new user or old user
                        User.findOne({
                            where: {
                                phoneNum: req.body.phone
                            }
                        })
                            .then(dbUser => {
                                if (dbUser) {
                                    const token = jwt.sign({ phone: req.body.phone }, 'secret', { expiresIn: '30d' });
                                    res.status(200).json({ message: `Welcome Back ${dbUser.name} !`, token: token, user:dbUser });
                                    

                                }
                                else { //user not signed up yet
                                    res.status(202).json({ message: "Welcome. Complete your profile" });
                                }
                            })
                            .catch(err => {
                                console.log('Error while getting user during login');
                                console.log(err);
                            })
                    }
                    else{
                        res.status(401).json({message: "Incorrect OTP. Please try again"})
                    }

                }
                else {
                    res.status(408).json({ message: "OTP Expired! Try login again to get a new OTP" })
                }
            }
        })
        .catch(err => { //in what situation?
            console.log("error while retrieve otp");
            console.log(err);
        })
}


//Register User into Database
const SignUp = (req, res, next) => {

    //Check if user already exists
    User.findOne({
        where: {
            phoneNum: req.body.phoneNum,
        }
    })
        .then(dbUser => {
            if (dbUser) {
                console.log("user already");
                return res.status(409).json({ message: "User Exists" });
            }
            else{
                return User.create(({
                    email: req.body.email,
                    phoneNum: req.body.phoneNum,
                    name: req.body.name,
                    birthday: req.body.date,
                    gender: req.body.gender,
                }))
                    .then((newUser) => {
                        const token = jwt.sign({ phone: req.body.phone }, 'secret', { expiresIn: '30d' });
                        res.status(200).json({ message: "User Created" ,token: token,  user:newUser});
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(502).json({ message: "error while creating the user" });
                    });
            }
        })
        .catch(err => {
            console.log('error', err);
        });
}


module.exports = {
    getOTPSMS, verifyOTP, SignUp
};