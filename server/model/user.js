//import {Sequelize} from 'sequelize';
const Sequelize = require('sequelize');

const sequelize = require('../utils/db') ;

const User = sequelize.define('user',{
    userID:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey: true,
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    phoneNum:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    birthday:{
        type:Sequelize.DATE,
        allowNull: false,
    },
    gender:{
        type:Sequelize.STRING,
        allowNull:false,
    },
})

module.exports = User;