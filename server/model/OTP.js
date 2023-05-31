//import {Sequelize} from 'sequelize';
const Sequelize = require('sequelize');

const sequelize = require('../utils/db') ;

const Otp = sequelize.define('OTP',{
    phoneNum:{
        type: Sequelize.STRING,
        autoIncrement:false,
        allowNull:false,
        primaryKey: true,
    },
    OTP:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    dateRequest:{
        type: Sequelize.DATE,
        allowNull: false,
    },
})

module.exports = Otp;