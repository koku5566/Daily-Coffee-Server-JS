//import {Sequelize} from 'sequelize';
const Sequelize = require('sequelize');

const sequelize = require('../utils/db') ;


const News = sequelize.define('news',{
    newsID:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey: true,
    },
    newsTitle:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    newsContent:{
        type: Sequelize.TEXT('long'),
        allowNull: false,
    },
    newsImage:{
        type: Sequelize.BLOB,
        allowNull: false,
    }
})

module.exports = News;