//import { Sequelize } from 'sequelize';
const Sequelize = require('sequelize');

const sequelize = new Sequelize('DCApp','dcadmin','0124229239@DailyCoffee',{
    dialect: 'mysql',
    host: '103.6.199.135:3306'
});

export default sequelize;