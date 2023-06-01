//import { Sequelize } from 'sequelize';
const Sequelize = require('sequelize');

const sequelize = new Sequelize('dcapp_db','root','0124229239@DailyCoffee',{
    dialect: 'mysql',
    host: '34.143.244.128',
    port: '3306',
});





module.exports = sequelize;

